import { getRepository, In } from "typeorm";

import { Analysis } from "src/entities/Analysis/Analysis";
import { AnalysisStepORM } from "src/entities/AnalysisStep/AnalysisStepORM";
import { ApplicationError } from "src/utils";

import { IAnalysisStepRepository } from "../IAnalysisStepRepository";

export class PGAnalysisStepRepository implements IAnalysisStepRepository {
	async findByAnalysis(analysis: Analysis[]) {
		const analysisIds = analysis.flatMap(({ id }) => id);

		const steps = await getRepository(AnalysisStepORM).find({
			where: {
				analysis: {
					id: In(analysisIds),
				},
			},
			relations: ["instruction"],
		});

		if (!steps) {
			throw new ApplicationError(404, "No Analysis Step whore found!");
		}

		return steps;
	}
}
