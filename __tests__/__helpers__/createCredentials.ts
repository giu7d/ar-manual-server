import request from "supertest";
import { v4 as uuid } from "uuid";

import { createBearerToken } from "./createBearerToken";

const { PORT = 8080 } = process.env;

const URL = `http://localhost:${PORT}`;

export async function createCredentials() {
	const payload = {
		firstName: "FirstName",
		lastName: "LastName",
		email: `${uuid()}@dev.com`,
		password: uuid(),
	};

	await request(URL).post("/accounts").send(payload);

	const { body } = await request(URL).post("/accounts/auth").send({
		email: payload.email,
		password: payload.password,
	});

	const bearerToken = createBearerToken(body.token);

	return bearerToken;
}
