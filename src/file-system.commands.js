import { homedir } from 'node:os';
import path from 'node:path';
import { CmdAnswer } from './cmd-answer.model.js';

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
  const isOk = changeDir(homedir());
  return new CmdAnswer(isOk);
};

export const getCurrentDir = () => {
  const result = process.cwd();
  return new CmdAnswer(true, result);
};

export const moveToParentDir = () => {
  const getCurrDirAnswer = getCurrentDir();
  
  const result = changeDir(path.resolve(getCurrDirAnswer.result, '../'));
  
  return new CmdAnswer(true, result)
};
