import express, { Express, Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import userRouter from './src/routes/user.js';
import dealsRouter from './src/routes/deals.js';
import { sequelize } from './src/db/db.js';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

sequelize
  .authenticate()
  .then(() => {
    console.log('DB CONNECTED');
  })
  .catch((err) => {
    console.error('DB ERRROR : ', err);
  });

app.use(cors());
app.use(express.json());

app.use('/auth', userRouter);

app.use('/deals', dealsRouter);

// @ts-ignore
app.use((err: ResponseError, _req, res, _next) => {
  const { status = 500, message = 'Server error' } = err;

  res.status(status).send({ message });
});

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
