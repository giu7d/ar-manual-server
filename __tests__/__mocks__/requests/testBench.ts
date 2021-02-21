export const generateCreateTestBenchRequest = () => ({
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
			description: "DESCRIPTION_1, DESCRIPTION_1, DESCRIPTION_1",
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
			description: "DESCRIPTION_2, DESCRIPTION_2, DESCRIPTION_2",
			sources: [
				{
					type: "image",
					src: "http://via.placeholder.com/300",
				},
			],
		},
	],
});

export const generateTestBench = (id = null) => ({
	...generateCreateTestBenchRequest(),
	id,
});
