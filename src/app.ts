import express from "express";
import { TypeORM } from "./db/TypeORM";
import { routes } from "./routes";

const app = express();

app.use(express.json());
app.use(routes);

TypeORM.connect();

export { app };
