import { homedir } from 'node:os';

class FileSystemController {
  changeDir(directory) {
    try {
      process.chdir(directory);
      return true;
    } catch {
      return false;
    }
  }

  setHomeDir() {
    this.changeDir(homedir());
  }
}

export const fileSystemController = new FileSystemController();
