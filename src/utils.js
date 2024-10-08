export const getUserNameFromArgs = () => {
  const userName = process.argv.find((arg) => arg.startsWith('--username='));
  return userName ? userName.split('=')[1] : '';
}