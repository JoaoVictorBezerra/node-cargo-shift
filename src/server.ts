import express from 'express';
import * as dotenv from 'dotenv';

import { Router, Request, Response } from 'express';
import { ICustomResponse } from './@types';
import { ClinetController as ClientController } from './controller';

dotenv.config();
const app = express();

const route = Router();

app.use(express.json());

route.get('/', (req: Request, res: Response) => {
  res.json({ message: 'hello world with Typescript' });
});

route.post('/api/client', async (req: Request, res: Response) => {
  const clientControllerInstance = new ClientController();

  const response: ICustomResponse = await clientControllerInstance.create(req);

  res.status(response.statusCode).json(response.body);
});

route.get('/api/client', async (req: Request, res: Response) => {
  const clientControllerInstance = new ClientController();

  const response: ICustomResponse = await clientControllerInstance.getAll();

  res.status(response.statusCode).json(response.body);
});

route.get('/api/client/:id', async (req: Request, res: Response) => {
  const clientControllerInstance = new ClientController();

  const response: ICustomResponse = await clientControllerInstance.getById(req);

  res.status(response.statusCode).json(response.body);
});

route.delete('/api/client/:id', async (req: Request, res: Response) => {
  const clientControllerInstance = new ClientController();

  const response: ICustomResponse = await clientControllerInstance.delete(req);

  res.status(response.statusCode).json(response.body);
});

route.put('/api/client/:id', async (req: Request, res: Response) => {
  const clientControllerInstance = new ClientController();

  const response: ICustomResponse = await clientControllerInstance.update(req);

  res.status(response.statusCode).json(response.body);
});

app.use(route);
app.listen(
  process.env.PORT,
  () => `server running on port ${process.env.PORT}`,
);
