import { Request, Response } from 'express';
import { ContainerService } from '../services/container-service';
import { CreateContainerRequest } from '../entities/container';
import { HttpStatusCode } from '../constants';
import { BusinessException } from '../exceptions';

export class ContainerController {
  protected containerService: ContainerService;

  constructor(containerService: ContainerService) {
    this.containerService = containerService;
  }

  async create(req: Request, res: Response) {
    try {
      const body: CreateContainerRequest = req.body;

      const requiredFields: Array<keyof CreateContainerRequest> = [
        'clientId',
        'container',
        'type',
        'status',
      ];

      for (const field of requiredFields) {
        if (!body[field]) {
          return res.status(HttpStatusCode.BAD_REQUEST).json({
            error: `${field} is required`,
          });
        }
      }

      const invalidFields = Object.keys(body).filter(
        (field) =>
          !requiredFields.includes(field as keyof CreateContainerRequest),
      );

      if (invalidFields.length > 0) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({
          error: `Invalid field(s): ${invalidFields.join(', ')}`,
        });
      }

      const createdContainer = await this.containerService.create(body);
      return res.status(HttpStatusCode.CREATED).json(createdContainer);
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
      const body: CreateContainerRequest = req.body;
      const containerId = req.params.id;

      const requiredFields: Array<keyof CreateContainerRequest> = [
        'clientId',
        'container',
        'type',
        'status',
      ];

      for (const field of requiredFields) {
        if (!body[field]) {
          return res.status(HttpStatusCode.BAD_REQUEST).json({
            error: `${field} is required`,
          });
        }
      }

      const invalidFields = Object.keys(body).filter(
        (field) =>
          !requiredFields.includes(field as keyof CreateContainerRequest),
      );

      if (invalidFields.length > 0) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({
          error: `Invalid field(s): ${invalidFields.join(', ')}`,
        });
      }

      const createdContainer = await this.containerService.update(
        containerId,
        body,
      );
      return res.status(HttpStatusCode.CREATED).json(createdContainer);
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

  async findAll(req: Request, res: Response) {
    try {
      const containers = await this.containerService.findAll();

      return res.status(HttpStatusCode.OK).json(containers);
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

  async findById(req: Request, res: Response) {
    try {
      const containerId = req.params.id;
      const container = await this.containerService.findById(containerId);
      if (!container) {
        throw new BusinessException(
          HttpStatusCode.NOT_FOUND,
          'Container not found',
        );
      }
      return container;
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
      const containerId = req.params.id;
      await this.containerService.delete(containerId);

      return res
        .status(HttpStatusCode.OK)
        .json({ message: 'Container deleted!' });
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
