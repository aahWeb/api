import express, { Router, Request, Response } from "express";
import { users } from "../mocks";
import { User } from "../user";

const router: Router = express.Router();

router.post("/user", function (req: Request, res: Response) {
    const { email, name, address }: User = req.body;

    if (users.find(user => user.email == email)) { res.status(404); return; }

    users.push({ email, name, address });
    res.status(201).json({
        message: 'Objet créé !'
    });
});

router.get('/users', function (req: Request, res: Response) {

    res.json(users);
}
);

export default router;