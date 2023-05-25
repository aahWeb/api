import express, { Express } from 'express';
import pastrie from "./routes/pastrie";
import ingredient from "./routes/ingredient";
import cors from "cors";

const port :number = 3001;
const app : Express = express();

app.use(cors());

app.use("/api", ingredient);
app.use("/api", pastrie);

app.listen(port, () =>
  console.log(`listen http://localhost:${port}`),
);