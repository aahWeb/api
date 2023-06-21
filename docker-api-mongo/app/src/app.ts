import express, { Express } from 'express';
import router from "./routes/index";

import cors from "cors";

import { open } from './db';

const port: number = 3002;
const app: Express = express();

app.use(cors());

app.use(express.urlencoded());
app.use(express.json());

open('yams');

// router
app.use(router);

open('yams').then(() => {
  app.listen(port, () =>{ 
    console.log("server")
    console.log(`http://localhost:${port}`)
  } )
 
})