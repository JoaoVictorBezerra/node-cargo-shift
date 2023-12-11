import { ClientService } from '../services';
import { BusinessException } from '../exceptions';
import { HttpStatusCode } from '../constants';
import { Request, Response } from 'express';
import { ZodError } from 'zod';

import {
  CreateClientSchema,
  UpdateClientSchema,
  uuidSchema,
  verifyExtraFields,
} from '../helpers';

import {
  CreateClientRequestDTO,
  UpdateClientRequestDTO,
} from '../entities/client';

import { Client } from '@prisma/client';

export class ClientController {
  protected clientService: ClientService;

  constructor(clientService: ClientService) {
    this.clientService = clientService;
  }

  async create(req: Request, res: Response) {
    try {
      const body: CreateClientRequestDTO = req.body;
      const createClientSchema = CreateClientSchema();
      const extraFields: string[] = verifyExtraFields(body, createClientSchema);

      if (extraFields.length > 0) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({
          error: `Extra fields: ${extraFields.join(', ')}`,
        });
      }

      await createClientSchema.parseAsync(body);

      const createdClient: Client = await this.clientService.create(body.name);

      return res.status(HttpStatusCode.CREATED).json(createdClient);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({
          error: error.errors[0].message,
        });
      }
      if (error instanceof BusinessException) {
        return res.status(error.statusCode).json({ error: error.message });
      } else {
        return res
          .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
          .json({ error: 'Internal Server Error' });
      }
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const getByIdSchema = uuidSchema();

      await getByIdSchema.parseAsync({ id });

      const client: Client | null = await this.clientService.findById(id);

      if (!client) {
        return res.status(HttpStatusCode.NOT_FOUND).json({
          error: 'Client not found',
        });
      }
      return res.status(HttpStatusCode.OK).json(client);
    } catch (error) {
      if (error instanceof BusinessException) {
        return res.status(error.statusCode).json({ error: error.message });
      } else {
        return res
          .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
          .json({ error: 'Internal Server Error' });
      }
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const clients: Client[] = await this.clientService.findAll();

      return res.status(HttpStatusCode.OK).json(clients);
    } catch (error) {
      if (error instanceof BusinessException) {
        return res.status(error.statusCode).json({ error: error.message });
      } else {
        return res
          .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
          .json({ error: 'Internal Server Error' });
      }
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const deleteSchema = uuidSchema();

      await deleteSchema.parseAsync({ id });

      const client: Client | null = await this.clientService.findById(id);

      if (!client) {
        return res.status(HttpStatusCode.NOT_FOUND).json({
          error: 'Client not found',
        });
      }

      await this.clientService.delete(id);

      return res.status(HttpStatusCode.OK).json({ message: 'Client deleted' });
    } catch (error) {
      if (error instanceof BusinessException) {
        return res.status(error.statusCode).json({ error: error.message });
      } else {
        return res
          .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
          .json({ error: 'Internal Server Error' });
      }
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const body: UpdateClientRequestDTO = req.body;

      const updateSchema = UpdateClientSchema();
      const verifyUuid = uuidSchema();

      const extraFields: string[] = verifyExtraFields(body, updateSchema);

      if (extraFields.length > 0) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({
          error: `Extra fields: ${extraFields.join(', ')}`,
        });
      }

      await verifyUuid.parseAsync({ id });
      await updateSchema.parseAsync({ body });

      const updatedClient: Client = await this.clientService.update(
        id,
        body.name,
      );

      return res.status(HttpStatusCode.OK).json(updatedClient);
    } catch (error) {
      if (error instanceof BusinessException) {
        return res.status(error.statusCode).json({ error: error.message });
      } else {
        return res
          .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
          .json({ error: 'Internal Server Error' });
      }
    }
  }
}
