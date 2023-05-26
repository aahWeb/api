import dotenv from 'dotenv'
dotenv.config()

export const csvFilePath: string | undefined = process.env.DATA_URL ;
export const port :number | undefined = process.env.API_PORT as number | undefined ;
export const host : string | undefined = process.env.API_URL as string | undefined ;
 