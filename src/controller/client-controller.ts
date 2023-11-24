import { Request } from 'express';
import { CreateClientRequest } from '../entities';
import { ClientService } from '../services';
import { BusinessException } from '../exceptions';
import { HttpStatusCode } from '../constants';
import { Http } from '../helpers';

export class ClientController {
  protected clientService: ClientService;

  constructor() {
    this.clientService = new ClientService();
  }

  async create(request: Request) {
    try {
      const body: CreateClientRequest = request.body;

      const requiredFields: Array<keyof CreateClientRequest> = ['name'];

      Object.keys(body).forEach((field) => {
        if (!requiredFields.includes(field as keyof CreateClientRequest)) {
          throw new BusinessException(
            HttpStatusCode.BAD_REQUEST,
            `Invalid field: ${field}`,
          );
        }
      });

      for (const field of requiredFields) {
        if (!body[field]) {
          return Http.response(HttpStatusCode.BAD_REQUEST, {
            error: `${field} is required`,
          });
        }
      }

      const createdClient = await this.clientService.create(body.name);

      return Http.response(HttpStatusCode.CREATED, { createdClient });
    } catch (error) {
      if (error instanceof BusinessException) {
        return Http.response(error.statusCode, { error: error.message });
      } else {
        return Http.response(HttpStatusCode.INTERNAL_SERVER_ERROR, {
          error: 'Internal Server Error',
        });
      }
    }
  }

  async getById(request: Request) {
    try {
      const id = request.params.id;
      const client = await this.clientService.findById(id);
      if (!client) {
        return Http.response(HttpStatusCode.BAD_REQUEST, 'Client not found');
      }

      return Http.response(HttpStatusCode.OK, { client });
    } catch (error) {
      if (error instanceof BusinessException) {
        return Http.response(error.statusCode, { error: error.message });
      } else {
        return Http.response(HttpStatusCode.INTERNAL_SERVER_ERROR, {
          error: 'Internal Server Error',
        });
      }
    }
  }

  async getAll() {
    try {
      const clients = await this.clientService.findAll();

      return Http.response(HttpStatusCode.OK, { clients });
    } catch (error) {
      if (error instanceof BusinessException) {
        return Http.response(error.statusCode, { error: error.message });
      } else {
        return Http.response(HttpStatusCode.INTERNAL_SERVER_ERROR, {
          error: 'Internal Server Error',
        });
      }
    }
  }

  async delete(request: Request) {
    try {
      const id = request.params.id;
      const client = await this.clientService.findById(id);

      if (!client) {
        return Http.response(HttpStatusCode.BAD_REQUEST, {
          message: 'Client not found!',
        });
      }

      await this.clientService.delete(id);

      return Http.response(HttpStatusCode.OK, { message: 'Client deleted' });
    } catch (error) {
      if (error instanceof BusinessException) {
        return Http.response(error.statusCode, { error: error.message });
      } else {
        return Http.response(HttpStatusCode.INTERNAL_SERVER_ERROR, {
          error: 'Internal Server Error',
        });
      }
    }
  }

  async update(request: Request) {
    try {
      const id = request.params.id;
      const body: CreateClientRequest = request.body;

      const requiredFields: Array<keyof CreateClientRequest> = ['name'];

      for (const field of requiredFields) {
        if (!body[field]) {
          return Http.response(HttpStatusCode.BAD_REQUEST, {
            error: `${field} is required`,
          });
        }
      }

      const updatedClient = await this.clientService.update(id, body.name);

      return Http.response(HttpStatusCode.OK, updatedClient);
    } catch (error) {
      if (error instanceof BusinessException) {
        return Http.response(error.statusCode, { error: error.message });
      } else {
        return Http.response(HttpStatusCode.INTERNAL_SERVER_ERROR, {
          error: 'Internal Server Error',
        });
      }
    }
  }
}
