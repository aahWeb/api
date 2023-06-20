import express, { Router } from "express";

import pastrie from "./pastrie";
import ingredient from "./ingredient";
import user from "./user";

const router: Router = express.Router();

router.use("/api", [ingredient, user, pastrie]);

export default router;