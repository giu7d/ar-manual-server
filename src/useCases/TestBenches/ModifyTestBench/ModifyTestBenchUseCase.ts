import { omit } from "lodash";

import { ITestBenchRepository } from "src/repositories/TestBench/ITestBenchRepository";

import { IModifyTestBenchRequestDTO } from "./ModifyTestBenchDTO";

export class ModifyTestBenchUseCase {
	constructor(private testBenchRepository: ITestBenchRepository) {}

	async execute(data: IModifyTestBenchRequestDTO) {
		const testBench = await this.testBenchRepository.findById(data.testBenchId);

		await this.testBenchRepository.modify(
			testBench.id,
			omit(data, "testBenchId")
		);
	}
}
