import request from "supertest";
import { v4 } from "uuid";

import { createCredentials } from "../__helpers__/createCredentials";
import { createTestBench } from "../__helpers__/createTestBench";

const { PORT = 8080 } = process.env;

const URL = `http://localhost:${PORT}`;

let bearerToken = null;

const analysis = {
	id: v4(),
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
			.set("Client-Type", "MANAGEMENT_WEB_APP")
			.set("testbenchid", analysis.testBenchId)
			.send(payload);

		expect(status).toBe(201);
		expect(body).toHaveProperty("id");

		analysis.id = body.id;
	});

	it("should create analysis for non admin users from mobile app", async () => {
		const bearerTokenWithoutAdminPermission = await createCredentials(
			false,
			"ANALYSIS_MOBILE_APP"
		);

		const payload = {
			finishedAt: analysis.finishedAt,
			startedAt: analysis.startedAt,
			status: analysis.finishedAt,
			steps: analysis.steps,
		};

		const { body, status } = await request(URL)
			.post("/analysis")
			.set("Authorization", bearerTokenWithoutAdminPermission)
			.set("Client-Type", "ANALYSIS_MOBILE_APP")
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
			.set("Client-Type", "MANAGEMENT_WEB_APP")
			.set("testbenchid", analysis.testBenchId)
			.send();

		expect(status).toBe(201);
		expect(body).toBeInstanceOf(Array);
	});
});
