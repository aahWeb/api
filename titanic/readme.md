## Installation/configuration

Tout est en place dans l'API cependant si vous voulez en savoir plus sur la configuration de celle-ci on détaille ci-dessous l'ensemble des dépendances que l'on a installé.

```bash
# Les dépendances de dev
npm i --save-dev typescript @types/node concurrently nodemon
npm i --save-dev @types/express @types/cors

# Les dépendances de production
npm install express cors dotenv csvtojson

```

## Fichier package.json 

Attention pour la gestion des import/export dans TypeScript, respectez la configuration du tsconfig.json, pas la peine d'ajouter type : module dans le package.json

```json
"scripts": {
    "dev": "concurrently \"tsc --watch\" \"nodemon dist/app.js\""
},
```

## Fichier tsconfig.json

```json
{
    "compilerOptions": {
        "outDir": "dist",
        "target": "es2022",
        "module": "CommonJS",
        "strict": true,
        "typeRoots": ["node_modules/@types"],
        "esModuleInterop": true
    },
    "include": [
        "src/**/*"
    ],
}
```

## Variables d'environemment

```js
import dotenv from 'dotenv'
dotenv.config()

const csvFilePath: string | undefined = process.env.DATA_URL

```

Un fichier à la racine du projet .env

```txt
DATA_URL="/Data/train.csv"
API_URL="http://localhost"
API_PORT=3002
```