import request from "supertest";

import { createCredentials } from "../__helpers__/createCredentials";
import { generateTestBench } from "../__mocks__/requests/testBench";

const { PORT = 8080 } = process.env;

const URL = `http://localhost:${PORT}`;

let bearerToken = null;

const testBench = generateTestBench();

describe("Account Endpoint", () => {
	beforeAll(async () => {
		bearerToken = await createCredentials();
	});

	it("should not create a test bench to account not admin", async () => {
		const payload = {
			testBenchSerialNumber: testBench.testBenchSerialNumber,
			componentSerialNumber: testBench.componentSerialNumber,
			thumbnailSrc: testBench.thumbnailSrc,
			cao: testBench.cao,
			instructions: testBench.instructions,
		};

		const bearerTokenWithoutAdminPermission = await createCredentials(false);

		const { status } = await request(URL)
			.post("/testbenches")
			.set("Authorization", bearerTokenWithoutAdminPermission)
			.set("Client-Type", "MANAGEMENT_WEB_APP")
			.send(payload);

		expect(status).toBe(403);
	});

	it("should create a test bench", async () => {
		const payload = {
			testBenchSerialNumber: testBench.testBenchSerialNumber,
			componentSerialNumber: testBench.componentSerialNumber,
			thumbnailSrc: testBench.thumbnailSrc,
			cao: testBench.cao,
			instructions: testBench.instructions,
		};

		const { body, status } = await request(URL)
			.post("/testbenches")
			.set("Authorization", bearerToken)
			.set("Client-Type", "MANAGEMENT_WEB_APP")
			.send(payload);

		expect(status).toBe(201);
		expect(body).toHaveProperty("id");

		testBench.id = body.id;
	});

	it("should index all test benches", async () => {
		const { body, status } = await request(URL)
			.get("/testbenches")
			.set("Authorization", bearerToken)
			.set("Client-Type", "MANAGEMENT_WEB_APP")
			.send();

		expect(status).toBe(200);
		expect(body.length).not.toBe(0);
	});

	it("should index all test benches to account not admin from mobile app", async () => {
		const bearerTokenWithoutAdminPermission = await createCredentials(false);

		const { body, status } = await request(URL)
			.get("/testbenches")
			.set("Authorization", bearerTokenWithoutAdminPermission)
			.set("Client-Type", "ANALYSIS_MOBILE_APP")
			.send();

		expect(status).toBe(200);
		expect(body.length).not.toBe(0);
	});

	it("should show a test bench", async () => {
		const { body, status } = await request(URL)
			.get(`/testbenches/${testBench.id}`)
			.set("Authorization", bearerToken)
			.set("Client-Type", "MANAGEMENT_WEB_APP")
			.send();

		expect(status).toBe(200);
		expect(body.id).toBe(testBench.id);
	});

	it("should show a test bench to account not admin from mobile app", async () => {
		const bearerTokenWithoutAdminPermission = await createCredentials(false);

		const { body, status } = await request(URL)
			.get(`/testbenches/${testBench.id}`)
			.set("Authorization", bearerTokenWithoutAdminPermission)
			.set("Client-Type", "ANALYSIS_MOBILE_APP")
			.send();

		expect(status).toBe(200);
		expect(body.id).toBe(testBench.id);
	});

	it("should modify test bench", async () => {
		const payload = {
			testBenchSerialNumber: "TESTBENCH-SERIAL-NEW",
		};

		const { status } = await request(URL)
			.put(`/testbenches/${testBench.id}`)
			.set("Authorization", bearerToken)
			.set("Client-Type", "MANAGEMENT_WEB_APP")
			.send(payload);

		expect(status).toBe(200);

		const { body } = await request(URL)
			.get(`/testbenches/${testBench.id}`)
			.set("Authorization", bearerToken)
			.set("Client-Type", "MANAGEMENT_WEB_APP")
			.send();

		expect(body.testBenchSerialNumber).toBe(payload.testBenchSerialNumber);
	});

	it("should modify instruction test bench", async () => {
		const payload = {
			instructions: [
				...testBench.instructions,
				{
					step: 3,
					title: "INSTRUCTION_3",
					description: "DESCRIPTION_3, DESCRIPTION_3, DESCRIPTION_3",
					sources: [
						{
							type: "image",
							src: "http://via.placeholder.com/300",
						},
					],
				},
			],
		};

		const { status } = await request(URL)
			.put(`/testbenches/${testBench.id}`)
			.set("Authorization", bearerToken)
			.set("Client-Type", "MANAGEMENT_WEB_APP")
			.send(payload);

		expect(status).toBe(200);

		const { body } = await request(URL)
			.get(`/testbenches/${testBench.id}`)
			.set("Authorization", bearerToken)
			.set("Client-Type", "MANAGEMENT_WEB_APP")
			.send();

		expect(body.instructions.length).toBe(payload.instructions.length);
	});

	it("should modify cao test bench", async () => {
		const payload = {
			cao: {
				description: "CAO_DESCRIPTION_NEW",
				items: [
					...testBench.cao.items,
					{
						description: "description_new",
						frequency: "frequency_new",
						method: "method_new",
						conformity: "conformity_new",
					},
				],
			},
		};

		const { status } = await request(URL)
			.put(`/testbenches/${testBench.id}`)
			.set("Authorization", bearerToken)
			.set("Client-Type", "MANAGEMENT_WEB_APP")
			.send(payload);

		expect(status).toBe(200);

		const { body } = await request(URL)
			.get(`/testbenches/${testBench.id}`)
			.set("Authorization", bearerToken)
			.set("Client-Type", "MANAGEMENT_WEB_APP")
			.send();

		expect(body.cao.items.length).toBe(payload.cao.items.length);
	});
});
