import * as readline from 'node:readline/promises';
import { commentator } from './commentator/index.js';
import { getCmdAndArgsFromUserInput } from './input.parsers.js';
import { dispatch } from './cmd.dispatcher.js';

export const waitUserInput = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.prompt();

  rl.on('line', (userInput) => {
    const { cmd, args } = getCmdAndArgsFromUserInput(userInput);

    if (cmd) {
      dispatch(cmd, args);
    }

    commentator.sayCurrentDir();
    if (!cmd) {
      commentator.askCommand();
    }
    rl.prompt();
  });

  rl.on('close', () => console.log(''));
};
