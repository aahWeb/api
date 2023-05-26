'use strict';
import express, { Express } from 'express';

import cors from "cors";
import router from './routes';
import { port, host } from "./config";

const app : Express = express();

app.use(cors());

// router
app.use("/api", router);

app.listen(port, () =>
  console.log(`listen ${host}:${port}`),
);