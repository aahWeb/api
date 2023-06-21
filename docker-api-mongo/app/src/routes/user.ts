import express, { Router, Request, Response } from "express";
import { IUser, User } from "../db/schemas/UserSchema";

const router: Router = express.Router();

router.get('/users', function (req: Request, res: Response) {
    User.find({}).select('id name email').sort({ name: 1 }).then((users: IUser[]) => {
        res.json(users);
    }).catch((err: Error) => {
        console.error(err);
        res.status(500).json(err);
    });
});

export default router;