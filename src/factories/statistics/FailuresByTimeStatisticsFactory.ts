import { AnalysisStep } from "src/entities/AnalysisStep/AnalysisStep";
import { formatDate } from "src/utils/time";

export interface FailuresByTime {
	failures: number;
	timestamp: Date;
}

export class FailuresByTimeStatisticsFactory {
	static create(analysisSteps: AnalysisStep[]) {
		const failureAnalysis = analysisSteps.filter(
			({ status }) => status === "failure"
		);

		const failuresByTime: FailuresByTime[] = [];

		failureAnalysis.forEach((step) => {
			const index = failuresByTime.findIndex(
				(failure) =>
					formatDate(failure.timestamp) === formatDate(step.finishedAt)
			);

			if (index === -1) {
				failuresByTime.push({
					failures: 1,
					timestamp: step.finishedAt,
				});
			} else {
				failuresByTime[index].failures++;
			}
		});

		return failuresByTime;
	}
}
