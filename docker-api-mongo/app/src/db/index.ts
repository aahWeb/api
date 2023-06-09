// Connexion persistente à la base MongoDB
import {MongoClient} from "mongodb";

import mongoose from "mongoose";

// Déclaration de la connectionString
const CONNECTION_STRING = "mongodb://root:example@mongo:27017/"; // Avec Docker
// const CONNECTION_STRING = 'mongodb://localhost:27017'; // Installation locale de MongoDB

// Initialise une connexion à la base MongoDB
// const client = new MongoClient(CONNECTION_STRING);

let db : any  = null;

export const open = (dbName : string) => {
  mongoose.set('strictQuery', true);
  mongoose.connect(CONNECTION_STRING, {
    dbName: dbName
  }).then((conn: any) => {
    console.log('Connection to MongoDB initialized … ');
    db = conn.connection.db;
  }).catch(console.error);

};

// Fonction permettant d'obtenir un object 'collection' Mongo
export const getCollection = (collectionName: string ) => {
  console.log(`Retrieving collection ${collectionName} …`);
  return db.collection(collectionName);
};
