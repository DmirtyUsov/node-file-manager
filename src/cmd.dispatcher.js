import { commentator } from './commentator.js';
import * as fileSystemCmd from './file-system.commands.js';
import * as miscCmd from './misc.commands.js';
import * as osCmd from './os-info.commands.js';

export const dispatch = async (cmd, args) => {
  const fnForRun = mapCmd2Fn[cmd];

  await runFn(cmd, args, fnForRun);
};

const runFn = async (cmd, args, fnForRun) => {
  if (fnForRun === undefined) {
    commentator.sayInvalidInput();
    return;
  }

  const cmdAnswer = await fnForRun(args);

  commentator.sayCmdAnswer(cmdAnswer);

  return cmdAnswer;
};

const handleOs = (arg) => {
  const arg2fn = {
    '--EOL': osCmd.getEOL,
    '--cpus': osCmd.getCpus,
    '--homedir': osCmd.getHomeDir,
    '--username': osCmd.getUserName,
    '--architecture': osCmd.getArchitecture,
  };
  const fnForRun = arg2fn[arg];
  runFn('os', [arg], fnForRun);
};

const mapCmd2Fn = {
  // no args
  '.exit': miscCmd.exit,
  ls: fileSystemCmd.getContent,
  up: fileSystemCmd.changeDirToParent,
  // one arg
  os: handleOs,
  cd: fileSystemCmd.changeDirTo,
  cat: fileSystemCmd.concatenate,
  add: undefined,
  rm: undefined,
  hash: undefined,
  // many args
  rn: undefined,
  cp: undefined,
  mv: undefined,
  compress: undefined,
  decompress: undefined,
};
