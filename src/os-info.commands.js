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
  const MHZ_IN_GHZ = 1000;
  const cpus = os.cpus();
  const text = `Total number of logical CPU cores: ${cpus.length}`;
  const table = cpus.map((cpu) => {
    return { 'Model': cpu.model, 'Clock Rate, GHz': cpu.speed / MHZ_IN_GHZ };
  });
  return new CmdAnswer(true, text, table);
};
