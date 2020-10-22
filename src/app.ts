import { errors as celebrateErrorHandler } from "celebrate";
import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";

import { TypeORM } from "src/db/TypeORM";
import { routes } from "src/routes";

const app = express();

app.use(cors());

app.use(
	fileUpload({
		limits: { fileSize: 50 * 1024 * 1024 },
	})
);

app.use(
	express.urlencoded({
		limit: "50mb",
		extended: false,
	})
);

app.use(
	express.json({
		limit: "50mb",
	})
);

app.use(routes);

app.use(celebrateErrorHandler());

TypeORM.connect();

export { app };
