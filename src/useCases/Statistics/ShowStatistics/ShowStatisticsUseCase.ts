import { CommonFailuresStatisticsFactory } from "src/factories/statistics/CommonFailuresStatisticsFactory";
import { FailuresByTimeStatisticsFactory } from "src/factories/statistics/FailuresByTimeStatisticsFactory";
import { FailuresByUserStatisticsFactory } from "src/factories/statistics/FailuresByUserStatisticsFactory";
import { UsersByTimeStatisticsFactory } from "src/factories/statistics/UsersByTimeStatisticsFactory";
import { IAnalysisRepository } from "src/repositories/Analysis/IAnalysisRepository";
import { IAnalysisStepRepository } from "src/repositories/AnalysisStep/IAnalysisStepRepository";
import { ITestBenchRepository } from "src/repositories/TestBench/ITestBenchRepository";
import { ApplicationError } from "src/utils";

import { IShowStatisticsRequestDTO } from "./ShowStatisticsDTO";

export class ShowStatisticsUseCase {
	constructor(
		private testBenchRepository: ITestBenchRepository,
		private analysisRepository: IAnalysisRepository,
		private analysisStepRepository: IAnalysisStepRepository
	) {}

	async execute(data: IShowStatisticsRequestDTO) {
		const testBench = await this.testBenchRepository.findById(data.testBenchId);
		const analysis = await this.analysisRepository.find(testBench.id);

		if (!analysis.length) {
			throw new ApplicationError(404, "No analysis available!");
		}

		const steps = await this.analysisStepRepository.findByAnalysis(analysis);

		if (!steps.length) {
			throw new ApplicationError(404, "No analysis steps available!");
		}

		const commonFailures = CommonFailuresStatisticsFactory.create(
			testBench,
			steps
		);
		const failuresByTime = FailuresByTimeStatisticsFactory.create(steps);
		const failuresByUsers = FailuresByUserStatisticsFactory.create(analysis);
		const usersByTime = UsersByTimeStatisticsFactory.create(analysis);

		const failuresToday = await this.failuresToday();
		const componentMostUsed = await this.componentMostAnalysis();
		return {
			commonFailures,
			failuresByTime,
			failuresByUsers,
			usersByTime,
			failuresToday,
			componentMostUsed,
		};
	}

	private async failuresToday() {
		const todayDate = new Date();

		todayDate.setHours(0);
		todayDate.setMinutes(0);
		todayDate.setSeconds(0);

		const analysis = await this.analysisRepository.findAllByDay(todayDate);
		return analysis.length;
	}
	private async componentMostAnalysis() {
		const analysis = await this.analysisRepository.findAll();
		const analysisByComponent = {};

		analysis.forEach(({ testBench }) => {
			if (!analysisByComponent[testBench.componentSerialNumber]) {
				analysisByComponent[testBench.componentSerialNumber] = 1;
			} else {
				analysisByComponent[testBench.componentSerialNumber] =
					analysisByComponent[testBench.componentSerialNumber] + 1;
			}
		});

		const [componentMostAnalysis] = Object.keys(analysisByComponent)
			.map((key) => ({ key, value: analysisByComponent[key] }))
			.sort((a, b) => b.value - a.value);

		if (!componentMostAnalysis) return undefined;

		return componentMostAnalysis.key;
	}
}
