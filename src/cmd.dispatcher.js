import { commentator } from './commentator.js';
import * as fileSystemCmd from './file-system.commands.js';
import * as miscCmd from './misc.commands.js';
import * as osCmd from './os-info.commands.js';

const NO_ARGS = 0;
const ONE_ARG = 1;

export const dispatch = async (cmd, args) => {
  const argsCount = args ? args.length : 0;
  switch (argsCount) {
    case NO_ARGS: {
      await handleCmdWithNoArgs(cmd);
      break;
    }
    case ONE_ARG: {
      handleCmdWithOneArg(cmd, args);
      break;
    }
    default: {
      handleCmdWithManyArgs(cmd, args);
    }
  }
};

const handleCmdWithNoArgs = async (cmd) => {
  const commands = {
    '.exit': miscCmd.exit,
    ls: fileSystemCmd.getContent,
    up: fileSystemCmd.moveToParentDir,
  };
  const runCmd = commands[cmd];

  return await handleRunCmd(cmd, [], runCmd);
};

const handleCmdWithOneArg = (cmd, args) => {
  const commands = {
    os: handleOs,
    cd: undefined,
    cat: undefined,
    add: undefined,
    rm: undefined,
    hash: undefined,
  };
  const runCmd = commands[cmd];

  handleRunCmd(cmd, args, runCmd);
};

const handleCmdWithManyArgs = (cmd, args) => {
  const commands = {
    rn: undefined,
    cp: undefined,
    mv: undefined,
    compress: undefined,
    decompress: undefined,
  };
  const runCmd = commands[cmd] ? commands[cmd] : runCmdNotFound;
  runCmd(args);
};

const handleOs = (arg) => {
  const knownArgs = {
    '--EOL': osCmd.getEOL,
    '--cpus': osCmd.getCpus,
    '--homedir': osCmd.getHomeDir,
    '--username': osCmd.getUserName,
    '--architecture': osCmd.getArchitecture,
  };
  const runCmd = knownArgs[arg];
  handleRunCmd('os', [arg], runCmd);
};

const runCmdNotFound = () => {
  commentator.sayInvalidInput();
};

const handleRunCmd = async (cmd, args, runCmd) => {
  if (runCmd === undefined) {
    commentator.sayInvalidInput();
    return;
  }

  const cmdAnswer = await runCmd(args);

  commentator.sayCmdAnswer(cmdAnswer);

  return cmdAnswer;
};
