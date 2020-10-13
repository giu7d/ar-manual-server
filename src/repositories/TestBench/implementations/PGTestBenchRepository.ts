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
}
