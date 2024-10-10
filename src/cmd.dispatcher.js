import { commentator } from './commentator/index.js';
import * as fileSystemCmd from './file-system.commands.js';
import * as osCmd from './os-info.commands.js';

const NO_ARGS = 0;
const ONE_ARG = 1;

export const dispatch = (cmd, args) => {
  const argsCount = args ? args.length : 0;
  console.log({ cmd }, { argsCount });
  switch (argsCount) {
    case NO_ARGS: {
      handleCmdWithNoArgs(cmd);
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

const handleCmdWithNoArgs = (cmd) => {
  const commands = {
    '.exit': process.exit,
    ls: undefined,
    up: fileSystemCmd.moveToParentDir,
  };
  const runCmd = commands[cmd];

  handleRunCmd(cmd, [], runCmd);
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

const handleRunCmd = (cmd, args, runCmd) => {
  if (runCmd === undefined) {
    commentator.sayInvalidInput();
    return;
  }

  const cmdAnswer = runCmd(args);

  if (cmdAnswer) {
    if (cmdAnswer.isOk) {
      commentator.say(cmdAnswer.text, console.log);
    } else {
      commentator.sayOperationFailed();
    }
  }
};
