export interface IError {
  type: string;
  message: string;
  error: any;
}

export class NotFoundError implements IError {
  readonly type = "NotFound";
  message: string;
  constructor(public error: Error) {
    this.message = error.message;
  }
}

export class UnexpectedError implements IError {
  readonly type = "UnexpectedError";
  message: string;
  constructor(public error: Error) {
    this.message = error.message;
  }
}

export class BadRequestError implements IError {
  readonly type = "BadRequestError";
  message: string;
  constructor(public error: Error) {
    this.message = error.message;
  }
}

export class FailedWriteError implements IError {
  readonly type = "FailedWriteError";
  message: string;
  constructor(public error: Error) {
    this.message = error.message;
  }
}
