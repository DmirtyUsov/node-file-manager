const DEFAULT_NAME = 'Incognito😎';
class Commentator {
  _userName = DEFAULT_NAME;

  set userName(newName) {
    this._userName = newName || DEFAULT_NAME;
  }

  say(message, useFn) {
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
    const message = `Enter your command:`;
    this.say(message, console.info);
  }

  sayCmdAnswer(cmdAnswer) {
    if (!cmdAnswer) {
      return;
    }

    if (cmdAnswer.isError) {
      commentator.sayOperationFailed();
      if (cmdAnswer.text) {
        commentator.say(cmdAnswer.text, console.warn);
      }
      return;
    }

    if (cmdAnswer.text) {
      this.say(cmdAnswer.text, console.info);
    }

    if (cmdAnswer.table) {
      this.say(cmdAnswer.table, console.table);
    }
  }
}

export const commentator = new Commentator();
