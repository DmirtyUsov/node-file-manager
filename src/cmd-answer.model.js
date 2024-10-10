export class CmdAnswer {
  constructor(
    isOk = false,
    plainResult = undefined,
    tabularResult = undefined
  ) {
    this.isOk = isOk;
    this.plainResult = plainResult;
    this.tabularResult = tabularResult;
  }

  get text() {
    return this.plainResult;
  }

  get table() {
    return this.tabularResult;
  }

  get isError() {
    return !this.isOk;
  }
}
