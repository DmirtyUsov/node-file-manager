import * as readline from 'node:readline/promises';

export const waitUserInput = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.prompt();

  rl.on('line', () => {
    rl.prompt();
  })

  rl.on('close', () => console.log(''));
};
