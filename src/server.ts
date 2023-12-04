import express, { Express, Request, Response } from 'express';
import * as dotenv from 'dotenv';

import { router } from './routes';

dotenv.config();

const app: Express = express();

app.use(express.json());

app.use((req: Request, res: Response, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Header', '*');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});

app.use('/api', router);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
