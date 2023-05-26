'use strict';
import express, { Router, Request, Response } from "express";
import { Passengers, PassengersSurvived } from "./model";
import { log } from "console";

const router: Router = express.Router();

router.get("/passengers", async function (req: Request, res: Response) {
    const data = await Passengers();
    log(data)
    res.json(data);
});

router.get("/passengers/Survived/:status", async function (req: Request, res: Response) {
    const status : string = req.params.status;
    const data = await PassengersSurvived(status);
    log(data)

    res.json(data);
}); 

router.get('*', function (req: Request, res: Response) {
    res.status(404).json({ error: "Not found" })
});

export default router;