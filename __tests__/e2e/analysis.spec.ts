import request from "supertest";

import { createCredentials } from "../__helpers__/createCredentials";
import { createTestBench } from "../__helpers__/createTestBench";

const { PORT = 8080 } = process.env;

const URL = `http://localhost:${PORT}`;

let bearerToken = null;

const analysis = {
	id: null,
	testBenchId: null,
	finishedAt: new Date().toISOString(),
	startedAt: new Date().toISOString(),
	status: "success",
	steps: [],
};

describe("Analysis Endpoint", () => {
	beforeAll(async () => {
		bearerToken = await createCredentials();
		const { testBenchId, instructionsIds } = await createTestBench(bearerToken);

		analysis.testBenchId = testBenchId;
		analysis.steps = instructionsIds.map((id) => ({
			instructionId: id,
			finishedAt: new Date().toISOString(),
			startedAt: new Date().toISOString(),
			status: "success",
		}));
	});

	it("should create analysis", async () => {
		const payload = {
			finishedAt: analysis.finishedAt,
			startedAt: analysis.startedAt,
			status: analysis.finishedAt,
			steps: analysis.steps,
		};

		const { body, status } = await request(URL)
			.post("/analysis")
			.set("Authorization", bearerToken)
			.set("testbenchid", analysis.testBenchId)
			.send(payload);

		expect(status).toBe(201);
		expect(body).toHaveProperty("id");

		analysis.id = body.id;
	});

	it("should index analysis", async () => {
		const { body, status } = await request(URL)
			.get("/analysis")
			.set("Authorization", bearerToken)
			.set("testbenchid", analysis.testBenchId)
			.send();

		expect(status).toBe(201);
		expect(body).toBeInstanceOf(Array);
	});
});
