import { ITestBenchRepository } from "src/repositories/TestBench/ITestBenchRepository";

import { ICreateAnalysisRequestDTO } from "./CreateAnalysisDTO";

export class CreateAnalysisUseCase {
	constructor(private repo: ITestBenchRepository) {}

	async execute(data: ICreateAnalysisRequestDTO) {
		return { data };
	}
}
