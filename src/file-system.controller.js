import { homedir } from 'node:os';
import path from 'node:path';

const changeDir = (directory) => {
  try {
    process.chdir(directory);
    return true;
  } catch(err) {
    console.log(err);
    return false;
  }
};

export const moveToHomeDir = () => {
  changeDir(homedir());
};

export const getCurrentDir = () => {
  return process.cwd();
};

export const moveToParentDir = () => {
  const currDir = getCurrentDir();
  changeDir(path.resolve(currDir, '../'));
};
