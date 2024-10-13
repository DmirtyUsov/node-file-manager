export const getUserNameFromProcessArgv = () => {
  const userName = process.argv.find((arg) => arg.startsWith('--username='));
  return userName ? userName.split('=')[1] : '';
};

export const getCmdAndArgsFromUserInput = (inputText) => {
  const [cmd, ...args] = inputText.trim().split(' ');
  const argsQuotesFree = args.map(arg => arg.replace(/^["'](.+(?=["']$))["']$/, '$1'));
  return { cmd, args: argsQuotesFree };
};
