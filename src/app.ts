import express, { Express } from 'express';
import router from "./routes";
import cors from "cors";

const port :number = 3001;
const app : Express = express();

app.use(cors())

app.use("/api", router);

app.listen(port, () =>
  console.log(`listen http://localhost:${port}`),
);