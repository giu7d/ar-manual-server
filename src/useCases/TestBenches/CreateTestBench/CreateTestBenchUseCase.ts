import { TestBenchFactory } from "src/factories/TestBenchFactory";
import { ITestBenchRepository } from "src/repositories/TestBench/ITestBenchRepository";

import { ICreateTestBenchRequestDTO } from "./CreateTestBenchDTO";

export class CreateTestBenchUseCase {
	constructor(private testBenchRepository: ITestBenchRepository) {}

	async execute(data: ICreateTestBenchRequestDTO) {
		const testbench = TestBenchFactory.create(data);

		await this.testBenchRepository.save(testbench);

		return { id: testbench.id };
	}
}
