export interface ICreateAnalysisRequestDTO {
	testBenchId: string;
	accountId: string;
	status: "approved" | "failure";
	startedAt: Date;
	finishedAt: Date;
	steps: {
		instructionId: string;
		status: "approved" | "failure";
		startedAt: Date;
		finishedAt: Date;
		failure?: {
			src: string[];
		};
	}[];
}
