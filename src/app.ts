import express, { Express } from 'express';
import pastrie from "./routes/pastrie";
import ingredient from "./routes/ingredient";
import user from "./routes/user";
import cors from "cors";

const port :number = 3001;
const app : Express = express();

app.use(cors());

app.use(express.urlencoded());
app.use(express.json());

// router
app.use("/api", user);
app.use("/api", ingredient);
app.use("/api", pastrie); // 404

app.listen(port, () =>
  console.log(`listen http://localhost:${port}`),
);