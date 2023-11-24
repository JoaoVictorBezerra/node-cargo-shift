export class BusinessException extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.name = 'HttpError';
    this.statusCode = statusCode;
  }

  log() {
    console.warn(`BusinessException ${this.statusCode}: ${this.message}`);
  }
}
