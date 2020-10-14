import { ITestBenchRepository } from "src/repositories/TestBench/ITestBenchRepository";

export class IndexTestBenchUseCase {
	constructor(private testBenchRepository: ITestBenchRepository) {}

	async execute() {
		const testBenches = this.testBenchRepository.find();

		return testBenches;
	}
}
