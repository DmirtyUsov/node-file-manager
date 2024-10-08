import * as readline from 'node:readline/promises';
import { commentator } from './commentator/index.js';
import { getCmdAndArgsFromUserInput } from './input.parsers.js';

export const waitUserInput = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.prompt();

  rl.on('line', (userInput) => {
    const cmdWithArgs = getCmdAndArgsFromUserInput(userInput);
    commentator.sayCurrentDir();
    rl.prompt();
  })

  rl.on('close', () => console.log(''));
};
