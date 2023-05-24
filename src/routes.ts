
import express, { Router, Request, Response } from "express";
import { PASTRIES as pastries } from "./mocks";
import { Pastrie } from "./pastrie";

const router: Router = express.Router();

// all pastries
router.get("/all", function (req: Request, res: Response) {
    res.json(pastries);
});

// id pastries
router.get("/pastrie/:id", function (req: Request, res: Response) {
    const id : string = req.params.id
    const pastrie: Pastrie | undefined = pastries.find(p => p.id == id);

    if(pastrie)
         res.json(pastrie);


});

router.get('*',function (req: Request, res: Response) {
    res.status(404).json({ error : "Not found" })
});

export default router;