import { getRepository, Repository } from "typeorm";

import { TestBench } from "src/entities/TestBench/TestBench";
import { TestBenchORM } from "src/entities/TestBench/TestBenchORM";

import { ITestBenchRepository } from "../ITestBenchRepository";

export class PGTestBenchRepository implements ITestBenchRepository {
	private repository(): Repository<TestBenchORM> {
		return getRepository(TestBenchORM);
	}

	async save(testBench: TestBench) {
		const testBenchORM = new TestBenchORM(testBench);
		await this.repository().save(testBenchORM);
	}

	async modify(testBench: TestBench) {
		await this.repository().save(testBench);
	}

	async find(isActive = true) {
		const testBenches = await this.repository().find({ where: { isActive } });
		return testBenches;
	}

	async findById(id: string, isActive = true) {
		const testBench = await this.repository().findOne(
			{ id, isActive },
			{
				relations: [
					"cao",
					"instructions",
					"instructions.sources",
					"instructions.warnings",
				],
			}
		);

		return testBench;
	}

	async delete(id: string) {
		await this.repository().update({ id, isActive: true }, { isActive: false });
	}
}
