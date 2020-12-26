import { CAOFactory } from "src/factories/CAOFactory";
import { InstructionsFactory } from "src/factories/InstructionsFactory";
import { ITestBenchRepository } from "src/repositories/TestBench/ITestBenchRepository";
import { TestBenchNotFound } from "src/utils/errors/TestBenchError";

import { IModifyTestBenchRequestDTO } from "./ModifyTestBenchDTO";

export class ModifyTestBenchUseCase {
	constructor(private testBenchRepository: ITestBenchRepository) {}

	async execute(data: IModifyTestBenchRequestDTO) {
		const testBench = await this.testBenchRepository.findById(data.testBenchId);

		if (!testBench) {
			throw new TestBenchNotFound();
		}

		if (data.cao) {
			testBench.cao = CAOFactory.create(data.cao);
		}

		if (data.instructions) {
			const instructions = InstructionsFactory.create(data.instructions);
			testBench.instructions = instructions;
		}

		await this.testBenchRepository.modify({
			...testBench,
			componentSerialNumber:
				data.componentSerialNumber || testBench.componentSerialNumber,
			testBenchSerialNumber:
				data.testBenchSerialNumber || testBench.testBenchSerialNumber,
			thumbnailSrc: data.thumbnailSrc || testBench.thumbnailSrc,
		});
	}
}
