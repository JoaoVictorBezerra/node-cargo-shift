import { Router } from 'express';
import { ContainerController } from './../controller/container-controller';
import { Request, Response } from 'express';

const containerController = new ContainerController();
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
