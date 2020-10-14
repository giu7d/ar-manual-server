import { ITestBenchRepository } from "src/repositories/TestBench/ITestBenchRepository";

import { IShowTestBenchRequestDTO } from "./ShowTestBenchDTO";

export class ShowTestBenchUseCase {
	constructor(private testBenchRepository: ITestBenchRepository) {}

	async execute(data: IShowTestBenchRequestDTO) {
		const account = await this.testBenchRepository.findById(data.testBenchId);

		return account;
	}
}
