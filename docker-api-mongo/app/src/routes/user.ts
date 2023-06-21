import express, { Router, Request, Response } from "express";
import { IUser, User } from "../db/schemas/UserSchema";

const router: Router = express.Router();

router.get('/users', function (req: Request, res: Response) {
        res.json(users);
});

export default router;