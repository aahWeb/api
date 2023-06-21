import express, { Router, Request, Response } from "express";
import { INGREDIENTS_LISTS } from "./../mocks";
import { List } from "./../pastrie";

const router: Router = express.Router();
const ingredients: List[] = INGREDIENTS_LISTS;

router.get('/ingredients', function (req: Request, res: Response) {
    return res.json(ingredients);
});

router.put("/ingredient/:id", function (req: Request, res: Response) {
    const id: string = req.params.id;
    const list: string[] = req.body.list;

    const i: List | undefined = ingredients.find(i => i.id == id);
    if (i) {
        i.list = list;
        return res.json(i);
    } else {
        return res.status(404).json({
            message: 'Ingrédient non trouvé !'
        });
    }
});

router.post("/ingredient", function (req: Request, res: Response) {
    try {
        const list: string[] = req.body;
        const id: string = (parseInt(ingredients[ingredients.length - 1].id) + 1).toString() || "1";  // get last id and increment it
        ingredients.push({ id, list });
        return res.status(201).json(list);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
});

router.get("/ingredient/:id", function (req: Request, res: Response) {
    const id: string = req.params.id;
    const i: string[] | undefined = ingredients.find(i => i.id == id)?.list;
    if (i) {
        return res.json(i);
    } else {
        return res.status(404).json({
            message: 'Ingrédient non trouvé !'
        });
    }
});

router.delete("/ingredient/:id", function (req: Request, res: Response) {
    const id: string = req.params.id;
    const i: List | undefined = ingredients.find(i => i.id == id);
    if (i) {
        ingredients.splice(ingredients.indexOf(i), 1);
        return res.status(200).json({
            message: 'Ingrédient supprimé !'
        });
    } else {
        return res.status(404).json({
            message: 'Ingrédient non trouvé !'
        });
    }
});

export default router;