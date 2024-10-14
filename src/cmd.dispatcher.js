import { commentator } from './commentator.js';
import * as fileSystemCmd from './file-system.commands.js';
import * as miscCmd from './misc.commands.js';
import * as osCmd from './os-info.commands.js';

const NO_ARGS = 0;
const ONE_ARG = 1;
const TWO_ARGS = 2;

export const dispatch = async (cmd, args) => {
  let fnForRun = undefined;

  switch (args.length) {
    case NO_ARGS: {
      fnForRun = mapCmdNoArgs2Fn[cmd];
      break;
    }
    case ONE_ARG: {
      fnForRun = mapCmdOneArg2Fn[cmd];
      break;
    }
    case TWO_ARGS: {
      fnForRun = mapCmdTwoArgs2Fn[cmd];
      break;
    }
    default:
      fnForRun = undefined;
      break;
  }

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

const mapCmdNoArgs2Fn = {
  '.exit': miscCmd.exit,
  ls: fileSystemCmd.getContent,
  up: fileSystemCmd.changeDirToParent,
};

const mapCmdOneArg2Fn = {
  os: handleOs,
  cd: fileSystemCmd.changeDirTo,
  cat: fileSystemCmd.concatenate,
  add: fileSystemCmd.createFile,
  rm: fileSystemCmd.deleteFile,
  hash: miscCmd.calcFileHash,
};

const mapCmdTwoArgs2Fn = {
  rn: fileSystemCmd.renameFile,
  cp: fileSystemCmd.copyFile,
  mv: fileSystemCmd.moveFile,
  compress: miscCmd.compress,
  decompress: miscCmd.decompress,
};
