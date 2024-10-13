export const getUserNameFromProcessArgv = () => {
  const userName = process.argv.find((arg) => arg.startsWith('--username='));
  return userName ? userName.split('=')[1] : '';
};

export const getCmdAndArgsFromUserInput = (inputText) => {

  const [cmd, ...args] = inputText
    .trim()
    .split('')
    .reduce(
      (accumulator, char) => {
        let charToAdd = char;
        if (char === '"') {
          accumulator.isBeforeWasQuote = !accumulator.isBeforeWasQuote;
          charToAdd = '';
        }
        if (char === ' ' && !accumulator.isBeforeWasQuote) {
          charToAdd = '';
          accumulator.splits.push([]);
        }
        if (charToAdd) {
          const splitIdx = accumulator.splits.length - 1;
          accumulator.splits[splitIdx].push(char);
        }
        return accumulator;
      },
      { splits: [[]], isBeforeWasQuote: false }
    )
    .splits.map((split) => split.join(''));
  return { cmd, args };
};
