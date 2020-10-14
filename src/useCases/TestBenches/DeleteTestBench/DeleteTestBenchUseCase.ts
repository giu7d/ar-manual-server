import { ITestBenchRepository } from "src/repositories/TestBench/ITestBenchRepository";

import { IDeleteTestBenchRequestDTO } from "./DeleteTestBenchDTO";

export class DeleteTestBenchUseCase {
	constructor(private testBenchRepository: ITestBenchRepository) {}

	async execute(data: IDeleteTestBenchRequestDTO) {
		const testBench = await this.testBenchRepository.findById(data.testBenchId);

		await this.testBenchRepository.delete(testBench.id);
	}
}
