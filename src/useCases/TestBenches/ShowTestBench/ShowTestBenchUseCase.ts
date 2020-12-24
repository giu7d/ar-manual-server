import { ITestBenchRepository } from "src/repositories/TestBench/ITestBenchRepository";
import { TestBenchNotFound } from "src/utils/errors/TestBenchError";

import { IShowTestBenchRequestDTO } from "./ShowTestBenchDTO";

export class ShowTestBenchUseCase {
	constructor(private testBenchRepository: ITestBenchRepository) {}

	async execute(data: IShowTestBenchRequestDTO) {
		const testBench = await this.testBenchRepository.findById(data.testBenchId);

		if (!testBench) {
			throw new TestBenchNotFound();
		}

		return testBench;
	}
}
