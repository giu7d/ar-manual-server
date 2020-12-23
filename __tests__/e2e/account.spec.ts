import request from "supertest";
import { v4 as uuid } from "uuid";

import { createBearerToken } from "../__helpers__/createBearerToken";

const { PORT = 8080 } = process.env;

const URL = `http://localhost:${PORT}`;

const account = {
	id: null,
	bearerToken: null,
	email: `${uuid()}@dev.com`,
	password: "strong_password",
};

describe("Account Endpoint", () => {
	it("should create account", async () => {
		const payload = {
			firstName: "FirstName",
			lastName: "LastName",
			email: account.email,
			password: account.password,
		};

		const { body, status } = await request(URL).post("/accounts").send(payload);

		expect(status).toBe(201);
		expect(body).toHaveProperty("id");

		account.id = body.id;
	});

	it("should authenticate account", async () => {
		const payload = {
			email: account.email,
			password: account.password,
		};

		const { body, status } = await request(URL)
			.post("/accounts/auth")
			.send(payload);

		expect(status).toBe(200);
		expect(body).toHaveProperty("token");

		account.bearerToken = createBearerToken(body.token);
	});

	it("should show account", async () => {
		const { body, status } = await request(URL)
			.get(`/accounts/${account.id}`)
			.set("Authorization", account.bearerToken)
			.send();

		expect(status).toBe(200);
		expect(body.id).toBe(account.id);
	});

	it("should modify password account", async () => {
		const payload = {
			oldPassword: account.password,
			newPassword: "new_password",
		};

		const { status } = await request(URL)
			.put(`/accounts/${account.id}`)
			.set("Authorization", account.bearerToken)
			.send(payload);

		expect(status).toBe(200);

		account.password = "new_password";
	});

	it("should not authenticate account with older password", async () => {
		const payload = {
			email: account.email,
			password: "strong_password",
		};

		const { status } = await request(URL).post("/accounts/auth").send(payload);

		expect(status).toBe(403);
	});

	it("should authenticate account with new password", async () => {
		const payload = {
			email: account.email,
			password: account.password,
		};

		const { body, status } = await request(URL)
			.post("/accounts/auth")
			.send(payload);

		expect(status).toBe(200);
		expect(body).toHaveProperty("token");

		account.bearerToken = createBearerToken(body.token);
	});

	it("should delete account", async () => {
		const { status } = await request(URL)
			.delete(`/accounts/${account.id}`)
			.set("Authorization", account.bearerToken)
			.send();

		expect(status).toBe(200);
	});

	it("should not authenticate a deleted account", async () => {
		const payload = {
			email: account.email,
			password: account.password,
		};

		const { status } = await request(URL).post("/accounts/auth").send(payload);

		expect(status).toBe(404);
	});
});
