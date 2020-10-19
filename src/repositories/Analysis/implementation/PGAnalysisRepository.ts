import { getRepository, Repository } from "typeorm";

import { Analysis } from "src/entities/Analysis/Analysis";
import { AnalysisORM } from "src/entities/Analysis/AnalysisORM";
import { ApplicationError } from "src/utils";

import { IAnalysisRepository } from "../IAnalysisRepository";

export class PGAnalysisRepository implements IAnalysisRepository {
	private repository(): Repository<AnalysisORM> {
		return getRepository(AnalysisORM);
	}

	async save(analysis: Analysis) {
		if (!analysis) {
			throw new ApplicationError(400, "Analysis needs to be passed!");
		}

		await this.repository().save({
			...analysis,
			testBenchId: analysis.testBench.id,
			accountId: analysis.account.id,
		});
	}

	async find(testBenchId: string) {
		if (!testBenchId) {
			throw new ApplicationError(400, "Test Bench ID needs to be passed!");
		}

		const analysis = await this.repository().find({
			where: { testBenchId },
			relations: ["steps", "steps.instruction"],
		});

		return analysis;
	}
}
