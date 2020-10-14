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
		const {
			instructions,
			...testbench
		} = await this.testBenchRepository.findById(data.testBenchId);

		const lastInstruction = instructions.find(({ nextStep }) => !nextStep);

		const instruction = InstructionFactory.create(
			lastInstruction.step + 1,
			data
		);

		await this.instructionRepository.save(testbench.id, instruction);
		await this.instructionRepository.modify(lastInstruction.id, {
			nextStep: instruction.step,
		});
	}
}
