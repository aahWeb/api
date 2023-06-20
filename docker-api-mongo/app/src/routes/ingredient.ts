import express, { Router, Request, Response } from "express";
import { INGREDIENTS_LISTS as ingredients } from "../mocks";
import { List } from "../pastrie";

const router: Router = express.Router();

router.get("/ingredient/:id", function (req: Request, res: Response) {
    const id: string = req.params.id
    const i: string[] | undefined = ingredients.find(i => i.id == id)?.list;

    if (i)
        res.json(i);
});

export default router;