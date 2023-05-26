'use strict';
import csv from "csvtojson"
import path from "path"
import dotenv from 'dotenv'
dotenv.config()

import { Passenger } from "./Passenger"

const csvFilePath: string | undefined = process.env.DATA_URL

export async function Passengers(): Promise<Passenger[]> {
    const jsonArray = await csv().fromFile(path.join(__dirname, "../src" + csvFilePath));

    return jsonArray;
}

export async function PassengersSurvived(status: string): Promise<Passenger[]> {
    const jsonArray = await csv().fromFile(path.join(__dirname, "../src" + csvFilePath));

    return jsonArray.filter(p => p.Survived == status);
}