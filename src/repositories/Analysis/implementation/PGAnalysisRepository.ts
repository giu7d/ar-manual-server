import { Between, getRepository, Repository } from "typeorm";

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

	async findAllByDay(date: Date) {
		const afterDate = new Date(date);
		afterDate.setDate(date.getDate() + 1);

		const analysis = await this.repository().find({
			where: {
				finishedAt: Between(date, afterDate),
			},
			relations: ["steps", "steps.instruction", "account"],
		});

		return analysis;
	}

	async find(testBenchId: string) {
		const analysis = await this.repository().find({
			where: { testBench: { id: testBenchId } },
			relations: ["steps", "steps.instruction", "account"],
		});

		return analysis;
	}

	async findAll() {
		const analysis = await this.repository().find({
			relations: ["testBench"],
		});
		return analysis;
	}
}
