const DEFAULT_NAME = 'Incognito😎'
class Commentator {

  _userName = DEFAULT_NAME;

  set userName(newName) {
    this._userName = newName || DEFAULT_NAME;
  }

  say(message, useFn){
    useFn(message);
  }

  sayHi() {
    const message = `🖐 Welcome to the File Manager, ${this._userName}!`;
    this.say(message, console.info);
  }

  sayBye() {
    const message = `Thank you for using File Manager, ${this._userName}, goodbye! 👋`;
    this.say(message, console.info);
  }

  sayCurrentDir() {
    const message = `You are currently in \x1b[32m${process.cwd()} 📁\x1b[0m`;
    this.say(message, console.info);
  }

  sayInvalidInput() {
    const message = `❗ Invalid input`;
    this.say(message, console.error);
  }

  sayOperationFailed() {
    const message = `❌ Operation failed`;
    this.say(message, console.error);
  }

  askCommand() {
    const message = `Enter your command:`
    this.say(message, console.info);
  }
}

export const commentator = new Commentator();