import { commentator } from './commentator/index.js';

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
      handleCmdWithOneArg(cmd, args[0]);
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
    up: undefined,
  };
  const runCmd = commands[cmd] ? commands[cmd] : runCmdNotFound;
  runCmd();
};

const handleCmdWithOneArg = (cmd, arg) => {
  const commands = {
    os: handleOs,
    cd: undefined,
    cat: undefined,
    add: undefined,
    rm: undefined,
    hash: undefined,
  };
  const runCmd = commands[cmd] ? commands[cmd] : runCmdNotFound;
  runCmd(arg);
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
  const args = {
    '--EOL': undefined,
    '--cpus': undefined,
    '--homedir': undefined,
    '--username': undefined,
    '--architecture': undefined,
  };
  const runCmd = args[arg] ? args[arg] : runCmdNotFound;
  runCmd();
};

const runCmdNotFound = () => {
  commentator.sayInvalidInput();
};
