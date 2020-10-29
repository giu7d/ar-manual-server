import { getRepository, In } from "typeorm";

import { Analysis } from "src/entities/Analysis/Analysis";
import { AnalysisStepORM } from "src/entities/AnalysisStep/AnalysisStepORM";
import { ApplicationError } from "src/utils";

import { IAnalysisStepRepository } from "../IAnalysisStepRepository";

export class PGAnalysisStepRepository implements IAnalysisStepRepository {
	async findByAnalysis(analysis: Analysis[]) {
		if (!analysis) {
			throw new ApplicationError(400, "Analysis needs to be passed!");
		}

		const analysisIds = analysis.flatMap(({ id }) => id);

		const steps = await getRepository(AnalysisStepORM).find({
			where: {
				analysis: {
					id: In(analysisIds),
				},
			},
		});

		return steps;
	}
}
