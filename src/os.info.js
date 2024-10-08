import os from 'node:os';

export const logHomeDir = () => {
  console.log(os.homedir());
};

export const logUserName = () => {
  const { username } = os.userInfo();
  console.log(username);
};

export const logArchitecture = () => {
  console.log(os.arch());
};

export const logEOL = () => {
  console.log(JSON.stringify(os.EOL));
}

export const logCpus = () => {
  console.log(os.cpus());
}