import cors from 'cors';
import { routes } from '@infra/routes';
import express from 'express';
import { errorHandler } from '@shared/errors/error-handler';
import path from 'path';

const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', routes);

app.use(
  '/uploads',
  express.static(path.join(`${__dirname}`, '..', '..', '..', 'uploads/picos'))
);

app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}

export { app };
