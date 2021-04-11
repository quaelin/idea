export class HttpError extends TypeError {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export class BadInputs extends HttpError {
  constructor(message: string) {
    super(400, message);
  }
}
