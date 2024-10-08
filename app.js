import { commentator } from "./src/commentator/index.js";
import { getUserNameFromArgs } from "./src/utils.js";
import { waitUserInput } from "./src/cli.js";
import { fileSystemController } from "./src/file-system.controller.js";

console.clear();
fileSystemController.setHomeDir();
commentator.userName = getUserNameFromArgs();
commentator.sayHi();
commentator.sayCurrentDir();
commentator.askCommand();

waitUserInput();

process.on('exit', () => commentator.sayBye());