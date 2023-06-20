import express, { Express } from 'express';
import router from "./routes/index";

import cors from "cors";

import { open } from './database';

const port :number = 3001;
const app : Express = express();

app.use(cors());

app.use(express.urlencoded());
app.use(express.json());

// router
app.use(router);

app.listen(port, () =>
  console.log(`listen http://localhost:${port}`),
);