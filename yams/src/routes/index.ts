import express, { Router } from "express";

import pastrie from "./pastrie";
import ingredient from "./ingredient";
import user from "./user";
import auth from "./auth";

const router: Router = express.Router();

router.use("/api", [ingredient, user, pastrie, auth]);

export default router;