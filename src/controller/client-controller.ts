import { CreateClientRequest } from '../entities';
import { ClientService } from '../services';
import { BusinessException } from '../exceptions';
import { HttpStatusCode } from '../constants';
import { Request, Response } from 'express';

export class ClientController {
  protected clientService: ClientService;

  constructor() {
    this.clientService = new ClientService();
  }

  async create(req: Request, res: Response) {
    const body: CreateClientRequest = req.body;

    const requiredFields: Array<keyof CreateClientRequest> = ['name'];

    for (const field of requiredFields) {
      if (!body[field]) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({
          error: `${field} is required`,
        });
      }
    }

    const invalidFields = Object.keys(body).filter(
      (field) => !requiredFields.includes(field as keyof CreateClientRequest),
    );

    if (invalidFields.length > 0) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        error: `Invalid field(s): ${invalidFields.join(', ')}`,
      });
    }

    try {
      const createdClient = await this.clientService.create(body.name);
      return res.status(HttpStatusCode.CREATED).json(createdClient);
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

  async getById(req: Request, res: Response) {
    const id = req.params.id;
    const client = await this.clientService.findById(id);

    if (!client) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        error: 'Client not found',
      });
    }

    try {
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
      const clients = await this.clientService.findAll();

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
      const id = req.params.id;
      const client = await this.clientService.findById(id);

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
      const id = req.params.id;
      const body: CreateClientRequest = req.body;

      const requiredFields: Array<keyof CreateClientRequest> = ['name'];

      for (const field of requiredFields) {
        if (!body[field]) {
          return res.status(HttpStatusCode.BAD_REQUEST).json({
            error: `${field} is required`,
          });
        }
      }

      const updatedClient = await this.clientService.update(id, body.name);

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
