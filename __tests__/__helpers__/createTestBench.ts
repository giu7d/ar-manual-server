import request from "supertest";

import { generateCreateTestBenchRequest } from "../__mocks__/requests/testBench";

const { PORT = 8080 } = process.env;

const URL = `http://localhost:${PORT}`;

const payload = generateCreateTestBenchRequest();

export async function createTestBench(bearerToken: string) {
	const responseCreation = await request(URL)
		.post("/testbenches")
		.set("Authorization", bearerToken)
		.set("Client-Type", "MANAGEMENT_WEB_APP")
		.send(payload);

	const testBenchId = responseCreation.body.id;

	const responseShow = await request(URL)
		.get(`/testbenches/${testBenchId}`)
		.set("Authorization", bearerToken)
		.set("Client-Type", "MANAGEMENT_WEB_APP")
		.send();

	const instructionsIds = responseShow.body.instructions.map(({ id }) => id);

	return { testBenchId, instructionsIds };
}
