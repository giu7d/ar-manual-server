import { getRepository, Repository } from "typeorm";

import { TestBench } from "src/entities/TestBench/TestBench";
import { TestBenchORM } from "src/entities/TestBench/TestBenchORM";
import { ApplicationError } from "src/utils";

import { ITestBenchRepository } from "../ITestBenchRepository";

export class PGTestBenchRepository implements ITestBenchRepository {
	private repository(): Repository<TestBenchORM> {
		return getRepository(TestBenchORM);
	}

	async save(testBench: TestBench) {
		if (!testBench) {
			throw new ApplicationError(400, "TestBench needs to be passed!");
		}

		await this.repository().save(testBench);
	}

	async modify(
		id: string,
		testBench: Partial<Omit<TestBench, "id">>,
		isActive = true
	) {
		if (!id) {
			throw new ApplicationError(400, "TestBench Id needs to be passed!");
		}

		if (!testBench) {
			throw new ApplicationError(400, "TestBench needs to be passed!");
		}

		await this.repository().update({ id, isActive }, testBench);
	}

	async find(isActive = true) {
		const testBenches = await this.repository().find({ where: { isActive } });

		return testBenches;
	}

	async findById(id: string, isActive = true) {
		if (!id) {
			throw new ApplicationError(400, "TestBench Id needs to be passed!");
		}

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

		if (!testBench) {
			throw new ApplicationError(404, "TestBench do not exists!");
		}

		return testBench;
	}

	async delete(id: string) {
		if (!id) {
			throw new ApplicationError(400, "TestBench Id needs to be passed!");
		}

		await this.repository().update({ id, isActive: true }, { isActive: false });
	}
}
