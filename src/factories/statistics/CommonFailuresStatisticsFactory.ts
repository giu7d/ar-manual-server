import { AnalysisStep } from "src/entities/AnalysisStep/AnalysisStep";
import { TestBench } from "src/entities/TestBench/TestBench";

export interface CommonFailures {
	id: string;
	failure: string;
	qtd: number;
}

export class CommonFailuresStatisticsFactory {
	static create(testBench: TestBench, analysisSteps: AnalysisStep[]) {
		const failureAnalysis = analysisSteps.filter(
			({ status }) => status === "failure"
		);

		const instructionId = failureAnalysis.map(
			({ instruction }) => instruction.id
		);

		const commonFailures: CommonFailures[] = [];

		instructionId.forEach((id) => {
			const index = commonFailures.findIndex((failure) => failure.id === id);

			if (index === -1) {
				const instructionItem = testBench.instructions.find(
					(instruction) => instruction.id === id
				);

				commonFailures.push({
					id,
					failure: instructionItem ? instructionItem.title.toLowerCase() : "",
					qtd: 1,
				});
			} else {
				commonFailures[index].qtd++;
			}
		});

		return commonFailures;
	}
}
