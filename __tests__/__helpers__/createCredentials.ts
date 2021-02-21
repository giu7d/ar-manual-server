import request from "supertest";

import { generateCreateAccountRequest } from "../__mocks__/requests/account";
import { createBearerToken } from "./createBearerToken";

const { PORT = 8080 } = process.env;

const URL = `http://localhost:${PORT}`;

export async function createCredentials(isAdmin = true) {
	const payload = generateCreateAccountRequest(isAdmin);

	await request(URL).post("/accounts").send(payload);

	const { body } = await request(URL).post("/accounts/auth").send({
		email: payload.email,
		password: payload.password,
	});

	const bearerToken = createBearerToken(body.token);

	return bearerToken;
}
