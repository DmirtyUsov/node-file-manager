import * as readline from 'node:readline/promises';
import { commentator } from './commentator/index.js';

export const waitUserInput = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.prompt();

  rl.on('line', () => {
    commentator.sayCurrentDir();
    rl.prompt();
  })

  rl.on('close', () => console.log(''));
};
