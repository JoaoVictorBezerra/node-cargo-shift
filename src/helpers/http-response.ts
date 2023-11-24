import { ICustomResponse } from '../@types';

export class Http {
  static response(code: number, body: unknown): ICustomResponse {
    return {
      statusCode: code,
      body: body,
    };
  }
}
