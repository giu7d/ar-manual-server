import { Analysis } from "src/entities/Analysis/Analysis";
import { AnalysisStep } from "src/entities/AnalysisStep/AnalysisStep";
import { IAccountsRepository } from "src/repositories/Account/IAccountsRepository";
import { IAnalysisRepository } from "src/repositories/Analysis/IAnalysisRepository";
import { ITestBenchRepository } from "src/repositories/TestBench/ITestBenchRepository";

import { ICreateAnalysisRequestDTO } from "./CreateAnalysisDTO";

export class CreateAnalysisUseCase {
	constructor(
		private testBenchRepository: ITestBenchRepository,
		private accountRepository: IAccountsRepository,
		private analysisRepository: IAnalysisRepository
	) {}

	async execute(data: ICreateAnalysisRequestDTO) {
		const testBench = await this.testBenchRepository.findById(data.testBenchId);
		const account = await this.accountRepository.findById(data.accountId);

		console.log();

		const analysis = new Analysis({
			account,
			testBench,
			startedAt: data.startedAt,
			finishedAt: data.finishedAt,
			timeDifference: this.calculateTimeDifference(
				data.startedAt,
				data.finishedAt
			),
			status: data.status,
			steps: data.steps.map(
				(step) =>
					new AnalysisStep({
						status: step.status,
						startedAt: step.startedAt,
						finishedAt: step.finishedAt,
						timeDifference: this.calculateTimeDifference(
							step.startedAt,
							step.finishedAt
						),
						instruction: testBench.instructions.find(
							({ id }) => step.instructionId === id
						),
						failure: step.failure || undefined,
					})
			),
		});

		await this.analysisRepository.save(analysis);

		return { id: analysis.id };
	}

	private calculateTimeDifference(startDate: Date, endDate: Date) {
		const start = startDate.getTime();
		const end = endDate.getTime();

		return end - start;
	}
}
