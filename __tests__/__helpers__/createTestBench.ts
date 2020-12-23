import request from "supertest";

const { PORT = 8080 } = process.env;

const URL = `http://localhost:${PORT}`;

const payload = {
	testBenchSerialNumber: "TESTBENCH-SERIAL",
	componentSerialNumber: "COMPONENT-SERIAL",
	thumbnailSrc: "http://via.placeholder.com/300",
	cao: {
		description: "CAO_DESCRIPTION",
		items: [
			{
				description: "description",
				frequency: "frequency",
				method: "method",
				conformity: "conformity",
			},
		],
	},
	instructions: [
		{
			step: 1,
			title: "INSTRUCTION_1",
			description: "DESCRIPTION_1",
			sources: [
				{
					type: "image",
					src: "http://via.placeholder.com/300",
				},
			],
		},
		{
			step: 2,
			title: "INSTRUCTION_2",
			description: "DESCRIPTION_2",
			sources: [
				{
					type: "image",
					src: "http://via.placeholder.com/300",
				},
			],
		},
	],
};

export async function createTestBench(bearerToken: string) {
	const responseCreation = await request(URL)
		.post("/testbenches")
		.set("Authorization", bearerToken)
		.send(payload);

	const testBenchId = responseCreation.body.id;

	const responseShow = await request(URL)
		.get(`/testbenches/${testBenchId}`)
		.set("Authorization", bearerToken)
		.send();

	const instructionsIds = responseShow.body.instructions.map(({ id }) => id);

	return { testBenchId, instructionsIds };
}
