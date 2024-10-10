export class CmdAnswer {
  constructor(isOk = false, result = undefined) {
    this.isOk = isOk;
    this._result=result;
  }

  get result() {
    return this._result;
  }

  get isError() {
    return !this.isOk;
  }
}
