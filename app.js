import { commentator } from './src/commentator.js';
import { getUserNameFromProcessArgv } from './src/input.parsers.js';
import { waitUserInput } from './src/cli.js';
import * as fileSystemCmd from './src/file-system.commands.js';

console.clear();
fileSystemCmd.changeDirToHome();
commentator.userName = getUserNameFromProcessArgv();
commentator.sayHi();
commentator.sayCurrentDir();
commentator.askCommand();

waitUserInput();

process.on('exit', () => commentator.sayBye());
