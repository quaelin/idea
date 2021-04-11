export class BadInputs extends TypeError {
  status: number;

  constructor(message: string) {
    super(message);
    this.status = 400;
  }
}
