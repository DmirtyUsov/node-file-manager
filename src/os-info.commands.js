import os from 'node:os';
import { CmdAnswer } from './cmd-answer.model.js';

export const getHomeDir = () => {
  return new CmdAnswer(true, os.homedir());
};

export const getUserName = () => {
  const { username } = os.userInfo();
  return new CmdAnswer(true, username);
};

export const getArchitecture = () => {
  return new CmdAnswer(true, os.arch());
};

export const getEOL = () => {
  return new CmdAnswer(true, JSON.stringify(os.EOL));
};

export const getCpus = () => {
  return new CmdAnswer(true, os.cpus());
};
