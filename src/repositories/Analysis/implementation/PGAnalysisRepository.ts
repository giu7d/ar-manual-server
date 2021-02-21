import { getRepository, Repository } from "typeorm";

import { Analysis } from "src/entities/Analysis/Analysis";
import { AnalysisORM } from "src/entities/Analysis/AnalysisORM";

import { IAnalysisRepository } from "../IAnalysisRepository";

export class PGAnalysisRepository implements IAnalysisRepository {
	private repository(): Repository<AnalysisORM> {
		return getRepository(AnalysisORM);
	}

	async save(analysis: Analysis) {
		const analysisORM = new AnalysisORM(analysis);
		await this.repository().save(analysisORM);
	}

	async find(testBenchId: string) {
		const analysis = await this.repository().find({
			where: { testBench: { id: testBenchId } },
			relations: ["steps", "steps.instruction", "account"],
		});

		return analysis;
	}
}
