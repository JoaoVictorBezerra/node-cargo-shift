import { z } from 'zod';

function clientParams() {
  return z.object({
    name: z.string().trim().min(3).max(50),
  });
}

function uuidParams() {
  return z.object({
    id: z.string().uuid(),
  });
}

export {
  clientParams as CreateClientSchema,
  clientParams as UpdateClientSchema,
  uuidParams as uuidSchema,
};
