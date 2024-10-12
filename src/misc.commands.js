import { createReadStream } from 'node:fs';
import crypto from 'node:crypto';
import { checkIsFile } from './file-system.commands.js';

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
