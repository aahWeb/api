import express, { Router, Request, Response } from "express";
import { sign, verify } from 'jsonwebtoken';

const router: Router = express.Router();

router.get('/login', (req, res, next) => {
    const { username, password } = { username: "alan@alan.fr", password: "123" } // req.body

    if (username !== "alan@alan.fr" && password !== "123") res.status(401).end()

    const token = sign({ username }, 'secret');

    res.cookie("token", token);
    res.end();
})