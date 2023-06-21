import express, { Router, Request, Response } from "express";
import { PASTRIES } from "./../mocks";
import { Pastrie } from "./../pastrie";
import { authentified } from "../middleware";
import { trimAll } from "../utils/helpers";

const router: Router = express.Router();

// optimisation dans le comptage des pastries 
const pastries: Pastrie[] = PASTRIES;

// all pastries
router.get("/pastries", function (req: Request, res: Response) {
    return res.json(pastries);
});

// id pastries
router.get("/pastrie/:id", function (req: Request, res: Response) {
    const id: string = req.params.id
    const p: Pastrie | undefined = pastries.find(p => p.id == id);
    
    if (p) {
        return res.json(p);
    } else {
        return res.status(404).json({
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
    return res.json(pastries.length);
});

// ajouter une pâtisserie dans le mock
router.post("/pastrie", authentified, function (req: Request, res: Response) {
    try {
        const { ref, name, quantity, description, url, order, like, tags, choice } = trimAll(req.body);
        const p: Pastrie = { ref, name, quantity, description, url, order, like, tags, choice };

        // on vérifie les champs obligatoires
        if (!p.ref || !p.name || !p.quantity) {
            return res.status(400).json({
                message: 'Données invalides !'
            });
        }

        // on récupère le dernier id et on incrémente
        const lastId: string = pastries[pastries.length - 1]?.id || "0";
        p.id = (parseInt(lastId) + 1).toString();

        pastries.push(p);
        return res.json(p);
    } catch (error) {
        return res.status(500).json(error);
    }
});

// modifier une pâtisserie dans le mock
router.put("/pastrie/:id", authentified, function (req: Request, res: Response) {
    try {
        const id: string = req.params.id;
        const { ref, name, quantity, description, url, order, like, tags, choice } = trimAll(req.body);
        const p: Pastrie | undefined = pastries.find(p => p.id == id);

        // on vérifie que la pâtisserie existe
        if (!p) {
            return res.status(404).json({
                message: 'Pâtisserie non trouvée !'
            });
        }

        // on assigne les nouvelles valeurs à la pâtisserie
        p.ref = ref;
        p.name = name;
        p.quantity = quantity;
        p.description = description;
        p.url = url;
        p.order = order;
        p.like = like;
        p.tags = tags;
        p.choice = choice;

        return res.json(p);
    } catch (error) {
        return res.status(500).json(error);
    }
});


router.get('*', function (req: Request, res: Response) {
    return res.status(404).json({ error: "Not found" })
});

export default router;