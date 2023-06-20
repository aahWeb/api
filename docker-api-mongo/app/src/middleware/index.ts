import { Response, Request, NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';
import { User } from '../db/schemas/UserSchema';
import { verify } from 'jsonwebtoken';

export const authentified = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // On va chercher le token dans la requête
        const token: string = req.params?.token ?? req.cookies?.token ?? "";

        if (!token) {
            // aucun token = accès interdit
            return res.status(401).json({ error: "Unauthorized" });
        } else {
            // avec jwt on vérifie si le token est valide en fonction de la clé secrète
            verify(token, 'secret', (err: any, decoded: any) => {
                if (err) {
                    res.clearCookie('token'); // token invalide = on le supprime
                    return res.status(401).json({ error: "Unauthorized" });
                }

                // MongoDb a des ID de 24 caractères (qui sont des strings) = des ObjectID
                // (on dit que l'id est non séquentiel, il n'est pas incrémenté à chaque nouvel enregistrement en db)
                if (!isValidObjectId(String(decoded._id))) {
                    res.clearCookie('token'); // token invalide = on le supprime
                    return res.status(401).json({ error: "Unauthorized" });
                }

                // On cherche l'utilisateur en db avec l'id enregistré dans le payload du token
                User.findById(decoded._id).then((data: any) => {
                    if (!data) {
                        // aucun utilisateur trouvé avec cet id = accès interdit
                        res.clearCookie('token');
                        return res.status(401).json({ error: "Unauthorized" });
                    } else {
                        res.locals.id = data._id.toString(); // on sauvegarde l'id de l'utilisateur pour ne pas avoir à refaire la requête plusieurs fois
                        // (dans les autres routes avec le middleware authentified, on accédera à l'id de l'utilisateur avec res.locals.id)
                        return next(); // on passe à la suite, l'utilisateur est bien authentifié
                    }
                });
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
};