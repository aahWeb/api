'use strict';
import express, { Express } from 'express';

import cors from "cors";
import router from './routes';

import dotenv from 'dotenv'
dotenv.config()

const port :number | undefined = process.env.API_PORT as number | undefined ;
const host : string | undefined = process.env.API_URL as string | undefined ;
const app : Express = express();

app.use(cors());

// router
app.use("/api", router);

app.listen(port, () =>
  console.log(`listen ${host}:${port}`),
);