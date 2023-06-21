import express, { Router, Request, Response } from "express";
import { PASTRIES } from "./../mocks";
import { Pastrie } from "./../pastrie";

const router: Router = express.Router();

// optimisation dans le comptage des pastries 
const pastries: Pastrie[] = PASTRIES;

// all pastries
router.get("/pastries", function (req: Request, res: Response) {
    res.json(pastries);
});

// id pastries
router.get("/pastrie/:id", function (req: Request, res: Response) {
    const id: string = req.params.id
    const p: Pastrie | undefined = pastries.find(p => p.id == id);
    
    if (p) {
        res.json(p);
    } else {
        res.status(404).json({
            message: 'Pâtisserie non trouvée !'
        });
    }
});

router.get("/pastries-search/:word", function (req: Request, res: Response) {
    const word: string = req.params.word;
    const re = new RegExp(word.trim(), 'i');

    // by quantity order 
    const p: Pastrie[] = pastries.filter(p => p.name.match(re));

    if (p) {
        res.json(p);
    } else {
        res.status(404).json({
            message: 'Pâtisserie non trouvée !'
        });
    }
});

/**
 * Exemple de récupération des données avec start et end dans l'url 
 * Dans l'exemple ci-dessous on récupère deux pastries 
 * api/pastries/0/2
 */
router.get("/pastries/:offset?/:limit", function (req: Request, res: Response) {
    const offset: number = parseInt(req.params.offset);
    const limit: number = parseInt(req.params.limit);

    // on commence à offsetr et on prends limit elements
    const p: Pastrie[] = limit ? pastries.slice(offset).slice(0, limit) : pastries.slice(offset)
    return res.json(p);
});

// même requete mais ordonné
router.get("/pastries/order-quantity/:offset?/:limit", function (req: Request, res: Response) {
    const offset: number = parseInt(req.params.offset);
    const limit: number = parseInt(req.params.limit);

    // by quantity order 
    pastries.sort((a, b) => b.quantity - a.quantity)

    // on commence à offsetr et on prends limit elements
    const p: Pastrie[] = limit ? pastries.slice(offset).slice(0, limit) : pastries.slice(offset)
    return res.json(p);
});

// count number pastries 
router.get("/pastries-count", function (req: Request, res: Response) {
    res.json(pastries.length);
});

router.get('*', function (req: Request, res: Response) {
    res.status(404).json({ error: "Not found" })
});

export default router;