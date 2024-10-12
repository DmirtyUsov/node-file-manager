import { homedir } from 'node:os';
import fs from 'node:fs/promises';
import path from 'node:path';
import { CmdAnswer } from './cmd-answer.model.js';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

const changeDir = (directory) => {
  const answer = new CmdAnswer();
  try {
    process.chdir(directory);
    answer.isOk = true;
  } catch (err) {
    answer.plainResult = err.message;
    answer.isOk = false;
  }
  return answer;
};

const getDirEntryType = (dirEntry) => {
  if (dirEntry.isFile()) {
    return 'file';
  }
  if (dirEntry.isDirectory()) {
    return 'directory';
  }
  return 'other';
};

const compareDirEntries = (entryA, entryB) => {
  const isBothDirectories = entryA.isDirectory() && entryB.isDirectory();
  const isBothFiles = entryA.isFile() && entryB.isFile();

  if (isBothFiles || isBothDirectories) {
    return entryA.name.localeCompare(entryB.name);
  }

  return entryA.isDirectory() ? -1 : 1;
};

export const checkIsFile = async (pathToFile) => {
  const answer = new CmdAnswer();
  let stats;

  try {
    stats = await fs.stat(pathToFile);
  } catch (error) {
    answer.plainResult = error.message;
    return answer;
  }

  if (stats.isFile()) {
    answer.isOk = true;
    return answer;
  }

  answer.isInvalidInput = true;
  answer.plainResult = `${pathToFile} Not a file.`;
  return answer;
};

export const changeDirToHome = () => {
  return changeDirTo([homedir()]);
};

export const changeDirTo = (args) => {
  const pathToDir = args[0];
  return changeDir(pathToDir);
};

export const getCurrentDir = () => {
  const result = process.cwd();
  return new CmdAnswer(true, result);
};

export const changeDirToParent = () => {
  const getCurrDirAnswer = getCurrentDir();

  const answer = changeDirTo([path.resolve(getCurrDirAnswer.text, '../')]);

  return answer;
};

export const getContent = async () => {
  const path = process.cwd();
  const answer = new CmdAnswer();

  try {
    const entries = await fs.readdir(path, { withFileTypes: true });
    answer.tabularResult = entries
      .filter((entry) => entry.isDirectory() || entry.isFile())
      .sort(compareDirEntries)
      .map((entry) => ({
        Name: entry.name,
        Type: getDirEntryType(entry),
      }));
  } catch {
    return answer;
  }

  answer.isOk = true;
  return answer;
};

export const concatenate = async (args) => {
  const pathToFile = args[0];
  const answer = new CmdAnswer();

  try {
    const fileStream = createReadStream(pathToFile);

    fileStream.pipe(process.stdout);

    await new Promise((resolve, reject) => {
      fileStream.on('end', () => {
        answer.isOk = true;
        resolve();
      });
      fileStream.on('error', (err) => {
        reject(err);
      });
    });
  } catch (error) {
    answer.plainResult = error.message;
  }
  return answer;
};

export const createFile = async (args) => {
  const answer = new CmdAnswer();
  const file = args[0];

  const { dir, base } = path.parse(file);
  if (dir) {
    answer.isInvalidInput = true;
    answer.plainResult = `Enter only file name: ${base}`;
    return answer;
  }

  try {
    await fs.writeFile(base, '', { flag: 'wx' });
    answer.isOk = true;
    answer.plainResult = `${base} added to current directory.`;
  } catch (error) {
    answer.plainResult = error.message;
  }

  return answer;
};

export const deleteFile = async (args) => {
  const pathToFile = args[0];
  const answer = await checkIsFile(pathToFile);

  if (answer.isInvalidInput) {
    answer.plainResult = 'Only able to delete a file.';
    return answer;
  }

  try {
    await fs.rm(pathToFile);
    answer.isOk = true;
    answer.plainResult = `${pathToFile} deleted.`;
  } catch (error) {
    answer.plainResult = error.message;
  }

  return answer;
};

export const renameFile = async (args) => {
  const pathToFile = args[0];
  const { dir, base: oldName } = path.parse(pathToFile);
  let answer = await checkIsFile(pathToFile);

  if (answer.isError) {
    return answer;
  }

  if (answer.isInvalidInput) {
    answer.plainResult = `${answer.plainResult}\nOnly able to rename a file.`;
    return answer;
  }

  const { dir: emptyDir, base: newName } = path.parse(args[1]);
  if (emptyDir) {
    answer.isInvalidInput = true;
    answer.plainResult = `The second argument must contain only the new filename: ${newName}`;
    return answer;
  }
  const pathToNewFile = path.join(dir, newName);

  answer = await checkIsFile(pathToNewFile);
  if (answer.isOk) {
    answer.isInvalidInput = true;
    answer.isOk = false;
    answer.plainResult = `${pathToNewFile} already exists.`;
    return answer;
  }

  try {
    await fs.rename(pathToFile, newName);
    answer.isOk = true;
    answer.plainResult = `${pathToFile} renamed to ${newName}`;
  } catch (error) {
    answer.plainResult = error.message;
  }

  return answer;
};

export const copyFile = async (args) => {
  const pathToSrc = args[0];
  let answer = await checkIsFile(pathToSrc);

  if (answer.isError) {
    return answer;
  }

  if (answer.isInvalidInput) {
    answer.plainResult = `${answer.plainResult}\nOnly able to copy a file.`;
    return answer;
  }

  const { base: fileName } = path.parse(pathToSrc);

  const { dir: dstDir, base: dstBase, ext } = path.parse(args[1]);

  if (ext) {
    answer.isInvalidInput = true;
    answer.plainResult = `The second argument must contain only path to destination folder: ${dstDir}`;
    return answer;
  }
  const pathToNewFile = path.join(dstDir, dstBase, fileName);

  answer = await checkIsFile(pathToNewFile);
  if (answer.isOk) {
    answer.isInvalidInput = true;
    answer.isOk = false;
    answer.plainResult = `${pathToNewFile} already exists.`;
    return answer;
  }

  try {
    const srcStream = createReadStream(pathToSrc);
    const dstStream = createWriteStream(pathToNewFile, { flags: 'wx' });
    await pipeline(srcStream, dstStream);
    answer.isOk = true;
    answer.plainResult = `${pathToSrc} copied to ${pathToNewFile}`;
  } catch (error) {
    answer.plainResult = error.message;
  }

  return answer;
};

export const moveFile = async (args) => {
  let answer = await copyFile(args);

  if (answer.isError || answer.isInvalidInput) {
    return answer;
  }

  const copyAnswerText = answer.text;

  answer = await deleteFile(args);
  answer.plainResult = `${copyAnswerText}\n${answer.plainResult}`;

  return answer;
};
