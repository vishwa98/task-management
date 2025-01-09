import express, {Express, Request, Response} from "express";

import dotenv from "dotenv";
import { DataSource } from 'typeorm'

const app: Express = express();
dotenv.config();

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    synchronize: true,
})

const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
    res.send("Task API");
})

AppDataSource.initialize().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}).catch((error) => {
    console.log(error);
});
