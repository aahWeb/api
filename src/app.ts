import express, { Express } from 'express';
import router from "./routes";

const port :number = 3000;
const app : Express = express();

app.use("/api", router);


app.listen(3000, () =>
  console.log(`listen http://localhost:${port}`),
);