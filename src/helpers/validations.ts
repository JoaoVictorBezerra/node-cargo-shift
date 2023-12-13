import { z } from 'zod';

function clientParams() {
  return z.object({
    name: z.string().trim().min(3).max(50),
  });
}

function uuidParams() {
  return z.object({
    id: z
      .string({ required_error: 'ID is required' })
      .uuid({ message: 'Please, enter a valid UUID' }),
  });
}

function loginParams() {
  return z.object({
    name: z.string({ required_error: 'Name is required' }),
    // email: z.string().email(),
    password: z
      .string({ required_error: 'Password is required' })
      .trim()
      .min(6, { message: 'Password must be at least 6 characters' })
      .max(50, { message: 'Password must be at most 50 characters' }),
  });
}

export {
  clientParams as CreateClientSchema,
  clientParams as UpdateClientSchema,
  uuidParams as uuidSchema,
  loginParams as LoginSchema,
};
