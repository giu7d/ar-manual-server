import { IAnalysisRepository } from "src/repositories/Analysis/IAnalysisRepository";
import { ITestBenchRepository } from "src/repositories/TestBench/ITestBenchRepository";

import { IIndexAnalysisRequestDTO } from "./IndexAnalysisDTO";

export class IndexAnalysisUseCase {
	constructor(
		private testBenchRepository: ITestBenchRepository,
		private analysisRepository: IAnalysisRepository
	) {}

	async execute(data: IIndexAnalysisRequestDTO) {
		const testBench = await this.testBenchRepository.findById(data.testBenchId);

		const analysis = await this.analysisRepository.find(testBench.id);

		return analysis;
	}
}
