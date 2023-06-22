import express, { Express } from 'express';
import router from "./routes/index";
import cookieParser from 'cookie-parser';

import cors from "cors";

const port :number = 3001;
const app : Express = express();

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));

app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());

// router
app.use(router);

app.listen(port, () =>
  console.log(`listen http://localhost:${port}`),
);