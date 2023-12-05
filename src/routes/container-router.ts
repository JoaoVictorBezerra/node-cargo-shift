import { ContainerService } from './../services/container-service';
import { ContainerRepository } from './../repositories/container-repository';
import { Router } from 'express';
import { ContainerController } from './../controller/container-controller';
import { Request, Response } from 'express';

const containerRepository = new ContainerRepository();
const containerService = new ContainerService(containerRepository);
const containerController = new ContainerController(containerService);

const containerRouter = Router();

containerRouter
  .get('/', async (req: Request, res: Response) => {
    return await containerController.findAll(req, res);
  })
  .get('/:id', async (req: Request, res: Response) => {
    return await containerController.findById(req, res);
  })
  .post('/', async (req: Request, res: Response) => {
    return await containerController.create(req, res);
  })
  .put('/:id', async (req: Request, res: Response) => {
    return await containerController.update(req, res);
  })
  .delete('/:id', async (req: Request, res: Response) => {
    return await containerController.delete(req, res);
  });

export { containerRouter };
