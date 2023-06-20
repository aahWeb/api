import express, { Router, Request, Response } from "express";
import { PASTRIES as pastries } from "../mocks";
import { Pastrie } from "../pastrie";

const router: Router = express.Router();

// optimisation dans le comptage des pastries 
const COUNT : number = pastries.length;

// all pastries
router.get("/pastries", function (req: Request, res: Response) {
    res.json(pastries);
});

// id pastries
router.get("/pastrie/:id", function (req: Request, res: Response) {
    const id: string = req.params.id
    const p: Pastrie | undefined = pastries.find(p => p.id == id);

    if (p)
        res.json(p);
});

router.get("/pastries-search/:word", function (req: Request, res: Response) {
    const word: string = req.params.word;
    const re = new RegExp(word.trim(), 'i');

    // by quantity order 
    const p: Pastrie[] = pastries.filter(p => p.name.match(re));

    if (p)
        res.json(p);
});

/**
 * Exemple de récupération des données avec start et end dans l'url 
 * Dans l'exemple ci-dessous on récupère deux pastries 
 * api/pastries/0/2
 */
router.get("/pastries/:start?/:end", function (req: Request, res: Response) {
    const start: string = req.params.start;
    const end: string = req.params.end;

    let p: Pastrie[] = end ? pastries.slice(parseInt(start), parseInt(end) + 1) : pastries.slice(parseInt(start))

    if (p)
        res.json(p);
});

// même requete mais ordonné
router.get("/pastries/order-quantity/:start?/:end", function (req: Request, res: Response) {
    const start: string = req.params.start;
    const end: string = req.params.end;

    // by quantity order 
    pastries.sort((a, b) => b.quantity - a.quantity)

    const p: Pastrie[] = end ? pastries.slice(parseInt(start), parseInt(end) + 1) : pastries.slice(parseInt(start))

    if (p)
        res.json(p);
});

// count number pastries 
router.get("/pastries-count", function (req: Request, res: Response) {
    res.json(COUNT);
});

router.get('*', function (req: Request, res: Response) {
    res.status(404).json({ error: "Not found" })
});

export default router;