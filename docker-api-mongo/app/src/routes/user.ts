import express, { Router, Request, Response } from "express";
import { users } from "../mocks";

const router: Router = express.Router();

router.get('/users', function (req: Request, res: Response) {
    res.json(users);
});

export default router;