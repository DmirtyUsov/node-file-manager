import { homedir } from 'node:os';
import fs from 'node:fs/promises';
import path from 'node:path';
import { CmdAnswer } from './cmd-answer.model.js';

const changeDir = (directory) => {
  try {
    process.chdir(directory);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
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

export const moveToHomeDir = () => {
  const isOk = changeDir(homedir());
  return new CmdAnswer(isOk);
};

export const getCurrentDir = () => {
  const result = process.cwd();
  return new CmdAnswer(true, result);
};

export const moveToParentDir = () => {
  const getCurrDirAnswer = getCurrentDir();

  const result = changeDir(path.resolve(getCurrDirAnswer.text, '../'));

  return new CmdAnswer(result);
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
