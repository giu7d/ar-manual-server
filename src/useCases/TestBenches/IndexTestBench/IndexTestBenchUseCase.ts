import { ITestBenchRepository } from "src/repositories/TestBench/ITestBenchRepository";
import { TestBenchNotFound } from "src/utils/errors/TestBenchError";

export class IndexTestBenchUseCase {
	constructor(private testBenchRepository: ITestBenchRepository) {}

	async execute() {
		const testBenches = this.testBenchRepository.find();

		if (!testBenches) {
			throw new TestBenchNotFound();
		}

		return testBenches;
	}
}
