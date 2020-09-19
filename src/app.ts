import { errors as celebrateErrorHandler } from "celebrate";
import cors from "cors";
import express from "express";

import { TypeORM } from "src/db/TypeORM";
import { routes } from "src/routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(celebrateErrorHandler());

TypeORM.connect();

export { app };
