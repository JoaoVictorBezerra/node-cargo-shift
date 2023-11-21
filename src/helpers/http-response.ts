import { ICustomResponse } from '../@types';

export const HttpResponse = {
  success: (body: unknown): ICustomResponse => {
    return {
      statusCode: 200,
      body: body,
    };
  },
  badRequest: (body: unknown): ICustomResponse => {
    return {
      statusCode: 400,
      body: { message: body },
    };
  },
  created: (body: unknown): ICustomResponse => {
    return {
      statusCode: 201,
      body: body,
    };
  },
  error: (body: unknown): ICustomResponse => {
    return {
      statusCode: 500,
      body: body,
    };
  },
  conflict: (body: unknown): ICustomResponse => {
    return {
      statusCode: 409,
      body: body,
    };
  },
};
