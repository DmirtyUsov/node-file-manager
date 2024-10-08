import { commentator } from "./src/commentator/index.js";
import { getUserNameFromProcessArgv } from "./src/input.parsers.js";
import { waitUserInput } from "./src/cli.js";
import { fileSystemController } from "./src/file-system.controller.js";

console.clear();
fileSystemController.setHomeDir();
commentator.userName = getUserNameFromProcessArgv();
commentator.sayHi();
commentator.sayCurrentDir();
commentator.askCommand();

waitUserInput();

process.on('exit', () => commentator.sayBye());