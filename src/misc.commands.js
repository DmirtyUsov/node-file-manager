import { createReadStream, createWriteStream } from 'node:fs';
import crypto from 'node:crypto';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { checkIsFile } from './file-system.commands.js';
import { pipeline } from 'node:stream/promises';

export const exit = () => {
  process.exit();
};

export const calcFileHash = async (args) => {
  const pathToFile = args[0];
  const answer = await checkIsFile(pathToFile);

  if (answer.isInvalidInput) {
    answer.plainResult = 'Only able to hash a file.';
    return answer;
  }

  try {
    const hash = crypto.createHash('sha256');
    const fileStream = createReadStream(pathToFile);

    await new Promise((resolve, reject) => {
      fileStream.on('readable', () => {
        const content = fileStream.read();
        if (content) {
          hash.update(content);
        }
      });

      fileStream.on('end', () => {
        answer.isOk = true;
        answer.plainResult = `Hash is: 0x${hash.digest('hex')}`;
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

const archiveFile = async (srcPath, dstPath, isCompress = false) => {
  let answer = await checkIsFile(srcPath);
  if (answer.isError) {
    return answer;
  }

  if (answer.isInvalidInput) {
    answer.plainResult = `${answer.plainResult}\nOnly able to process a file.`;
    return answer;
  }

  answer = await checkIsFile(dstPath);
  if (answer.isOk) {
    answer.isInvalidInput = true;
    answer.isOk = false;
    answer.plainResult = `${dstPath} already exists.`;
    return answer;
  }

  try {
    const srcStream = createReadStream(srcPath);
    const dstStream = createWriteStream(dstPath, { flags: 'wx' });
    const transform = isCompress
      ? createBrotliCompress()
      : createBrotliDecompress();

    await pipeline(srcStream, transform, dstStream);

    answer.isOk = true;
    answer.plainResult = `${srcPath} ${
      isCompress ? '' : 'de'
    }compressed to ${dstPath}`;
  } catch (error) {
    answer.plainResult = error.message;
  }

  return answer;
};

export const compress = (args) => {
  const srcPath = args[0];
  const dstPath = args[1];

  return archiveFile(srcPath, dstPath, true);
};

export const decompress = (args) => {
  const srcPath = args[0];
  const dstPath = args[1];

  return archiveFile(srcPath, dstPath, false);
};
