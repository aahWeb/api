import express, { Router, Request, Response } from "express";
import { Pastrie, IPastrie } from "../db/schemas/PastrieSchema";

const router: Router = express.Router();

// recherche de toutes les pâtisseries
router.get("/pastries", function (req: Request, res: Response) {
    // On recherche toutes les pâtisseries en db
    Pastrie.find({}, (err: string, pastries: IPastrie[] | []) => {
        if (err)
            return res.status(500).json(err);
        return res.status(200).json(pastries);
    }).catch((err: string) => {
        console.error(err);
        return res.status(500).json(err);
    });
});

// recherche d'une pâtisserie par son id
router.get("/pastrie/:id", function (req: Request, res: Response) {
    const id: string = req.params.id;

    // on va chercher une patisserie en fonction de l'id saisie en paramètre (findById)
    Pastrie.findById(id, (err: string, pastrie: IPastrie | null) => {
        if (err)
            return res.status(500).json(err);
        if (!pastrie)
            return res.status(404).json({ message: "Pastrie not found" });
        return res.status(200).json(pastrie);
    }).catch((err: string) => {
        console.error(err);
        return res.status(500).json(err);
    });
});

/***
 * Recherche de pâtisseries par nom
 * On va rechercher des pâtisseries avec le nom saisit en paramètre (find)
 * api/pastries-search/:word
 * Exemple : api/pastries-search/chocolat
 */
router.get("/pastries-search/:word", function (req: Request, res: Response) {
    const word: string = req.params.word;
    const re = new RegExp(word.trim(), 'i');

    // On va rechercher des pâtisseries avec le nom saisit en paramètre (find)
    Pastrie.find({ name: re }, (err: string, pastries: IPastrie[] | []) => {
        if (err)
            return res.status(500).json(err);
        return res.status(200).json(pastries);
    }).catch((err: string) => {
        console.error(err);
        return res.status(500).json(err);
    });
});

/**
 * Exemple de récupération des données avec start et end dans l'url 
 * Dans l'exemple ci-dessous on récupère deux pastries 
 * api/pastries/0/2
 */
router.get("/pastries/:start?/:end", async function (req: Request, res: Response) {
    const start: number = parseInt(req.params.start);
    const end: number = parseInt(req.params.end);


    // limit correspond au nombre de pâtisseries que l'on souhaite récupérer
    // skip correspond au nombre de pâtisseries que l'on souhaite sauter depuis le début de la liste
    Pastrie.find({}).limit(end - start + 1).skip(start).then((pastries: IPastrie[] | []) => {
        return res.status(200).json(pastries);
    }).catch((err: string) => {
        console.error(err);
        return res.status(500).json(err);
    });
});

// même requete mais ordonné en fonction de la quantité
router.get("/pastries/order-quantity/:start?/:end", function (req: Request, res: Response) {
    const start: number = parseInt(req.params.start);
    const end: number = parseInt(req.params.end);

    Pastrie.find({}).limit(end - start + 1).skip(start).sort({ quantity: 1 }).then((pastries: IPastrie[] | []) => {
        return res.status(200).json(pastries);
    }).catch((err: string) => {
        console.error(err);
        return res.status(500).json(err);
    });
});

// count number pastries 
router.get("/pastries-count", function (req: Request, res: Response) {
    // On compte le nombre de pâtisseries en db (countDocuments)
    Pastrie.countDocuments({}).then((count: number) => {
        return res.status(200).json({ count });
    }).catch((err: string) => {
        console.error(err);
        return res.status(500).json(err);
    });
});

// créer une pâtisserie
router.post("/pastrie", function (req: Request, res: Response) {
    const pastrie: IPastrie = req.body;
    Pastrie.create(pastrie, (err: string, pastrie: IPastrie) => {
        if (err)
            return res.status(500).json(err);
        return res.status(201).json(pastrie);
    }).catch((err: string) => {
        console.error(err);
        return res.status(500).json(err);
    });
});

router.get('*', function (req: Request, res: Response) {
    res.status(404).json({ error: "Not found" })
});

export default router;