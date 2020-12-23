import { ITestBenchRepository } from "src/repositories/TestBench/ITestBenchRepository";
import { TestBenchNotFound } from "src/utils/errors/TestBenchError";

import { IDeleteTestBenchRequestDTO } from "./DeleteTestBenchDTO";

export class DeleteTestBenchUseCase {
	constructor(private testBenchRepository: ITestBenchRepository) {}

	async execute(data: IDeleteTestBenchRequestDTO) {
		const testBench = await this.testBenchRepository.findById(data.testBenchId);

		if (!testBench) {
			throw new TestBenchNotFound();
		}

		await this.testBenchRepository.delete(testBench.id);
	}
}
