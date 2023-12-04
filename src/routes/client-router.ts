import { Router } from 'express';
import { ClientController } from '../controller/client-controller';
import { Request, Response } from 'express';

const clientController = new ClientController();
const clientRouter = Router();

clientRouter
  .post('/', async (req: Request, res: Response) => {
    return await clientController.create(req, res);
  })
  .get('/', async (req: Request, res: Response) => {
    return await clientController.getAll(req, res);
  })
  .get('/:id', async (req: Request, res: Response) => {
    return await clientController.getById(req, res);
  })
  .put('/:id', async (req: Request, res: Response) => {
    return await clientController.update(req, res);
  })
  .delete('/:id', async (req: Request, res: Response) => {
    return await clientController.delete(req, res);
  });

export { clientRouter };
