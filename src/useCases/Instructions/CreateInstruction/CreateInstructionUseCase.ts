import { InstructionFactory } from "src/factories/InstructionFactory";
import { IInstructionRepository } from "src/repositories/Instruction/IInstructionRepository";
import { ITestBenchRepository } from "src/repositories/TestBench/ITestBenchRepository";

import { ICreateInstructionRequestDTO } from "./CreateInstructionDTO";

export class CreateInstructionUseCase {
	constructor(
		private testBenchRepository: ITestBenchRepository,
		private instructionRepository: IInstructionRepository
	) {}

	async execute(data: ICreateInstructionRequestDTO) {
		const testbench = await this.testBenchRepository.findById(data.testBenchId);

		const lastInstruction = testbench.instructions.find(
			({ nextInstructionId }) => !nextInstructionId
		);

		const instruction = InstructionFactory.create(
			lastInstruction ? lastInstruction.step + 1 : 1,
			data
		);

		await this.instructionRepository.save(testbench.id, instruction);

		if (lastInstruction) {
			await this.instructionRepository.modify(lastInstruction.id, {
				nextInstructionId: instruction.id,
			});
		}

		return { id: instruction.id };
	}
}
