import express, { Router, Request, Response } from "express";
import { sign } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { IUser, User } from "../db/schemas/UserSchema";

const router: Router = express.Router();

router.post('/login', (req: Request, res: Response) => {
    const { name, password } = req.body; // récupération des données du formulaire de login (name et password)
    User.findOne({ name: name }).then((data: any) => {
        if (!data) {
            // aucun utilisateur trouvé avec ce nom = accès interdit
            return res.status(400).json({ error: "User not found" });
        }

        /* compare le mot de passe en clair avec le mot de passe hashé en base */
        bcrypt.compare(password, data.password).then((result: boolean) => {
            if (result) {
                const token = sign({
                    _id: data._id /* l'id de l'utilisateur enregistré dans le payload du token */
                }, 'secret', {
                    expiresIn: '1h' // le token expire dans 1 heure
                });
                res.cookie('token', token, { httpOnly: true }); // écriture du cookie avec la valeur du token jwt
                /* httpOnly protege des attaques XSS (quelqu'un de malveillant ne pourra pas lire le cookie facilement) */
                return res.status(200).json({ message: "Logged in" });
            } else {
                return res.status(400).json({ error: "User not found" })
            }
        });
        
    }).catch((err: string) => {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    });
});


/* Register an user */
router.post("/register", function (req: Request, res: Response) {
    const { email, name, password, address }: IUser = req.body;
    const trimedName: string = name?.trim() ?? "";
    const trimedEmail: string = email?.trim() ?? "";
    const trimedAddress: string = address?.trim() ?? "";
    const trimedPassword: string = password?.trim() ?? "";

    if (trimedName.length < 3) {
        return res.status(400).json({ error: "Name must be at least 3 characters long" });
    }

    // skip password protection ?
    if (trimedPassword?.length < 3) {
        return res.status(400).json({ error: "Password must be at least 3 characters long" });
    }

    // regex check email?
    if (trimedEmail.length < 3) {
        return res.status(400).json({ error: "Email must be at least 3 characters long" });
    }

    User.findOne({$or: [{name: trimedName}, {email: trimedEmail}]}).then((data:any) => {

        if (data) {
            if (data.name === trimedName) {
                /* si un utilisateur avec le même nom existe déjà */
                return res.status(400).json({ error: "Name already exists" });
            } else {
                /* si le un utilisateur avec le même email existe déjà */
                return res.status(400).json({ error: "Email already exists" });
            }
        }

        /* hasher le mot de passe pour ne pas qu'il soit en clair en db */
        bcrypt.hash(trimedPassword, 10).then((hash: string) => {
            const user = new User({
                name: trimedName,
                email: trimedEmail,
                password: hash, // mot de passe hashé
                address: trimedAddress
            });

            /* creation de l'utilisateur en db avec le mot de passe hashé */
            user.save().then((data:any) => {
                return res.status(201).json({ message: "User created" });
            }).catch((err: string) => {
                console.error(err);
                return res.status(500).json({ error: "Internal server error" });
            });
        }).catch((err: string) => {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        });
        
    });
});

export default router;