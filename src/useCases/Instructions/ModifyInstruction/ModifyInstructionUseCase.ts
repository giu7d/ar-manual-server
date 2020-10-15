import { Instruction } from "src/entities/Instruction/Instruction";
import { IInstructionRepository } from "src/repositories/Instruction/IInstructionRepository";
import { ITestBenchRepository } from "src/repositories/TestBench/ITestBenchRepository";

import { IModifyInstructionRequestDTO } from "./ModifyInstructionDTO";

export class ModifyInstructionUseCase {
	constructor(
		private testBenchRepository: ITestBenchRepository,
		private instructionRepository: IInstructionRepository
	) {}

	async execute(data: IModifyInstructionRequestDTO) {
		const instruction = await this.instructionRepository.findById(
			data.instructionId
		);

		if (data.description) {
			await this.instructionRepository.modify(instruction.id, {
				description: data.description,
			});
		}

		if (data.step) {
			const { instructions } = await this.testBenchRepository.findById(
				data.testBenchId
			);

			const splicedInstructions = this.splice(
				instruction,
				data.step,
				instructions
			);

			const normalizedInstructions = this.normalize(splicedInstructions);

			normalizedInstructions.forEach(({ id, step, nextInstructionId }) => {
				this.instructionRepository.modify(id, {
					step,
					nextInstructionId,
				});
			});
		}
	}

	private splice(
		instruction: Instruction,
		newInstructionStep: number,
		instructions: Instruction[]
	) {
		const originalInstructionIndex = instructions.findIndex(
			(item) => item.id === instruction.id
		);

		// Instruction dependent on the instruction that will be modified
		const dependentInstructionIndex = instructions.findIndex(
			(item) => item.nextInstructionId === instruction.id
		);

		instructions[dependentInstructionIndex] = {
			...instructions[dependentInstructionIndex],
			nextInstructionId: instruction.nextInstructionId,
		};

		// Instruction replacement target
		const targetInstruction = instructions.find(
			(item) => item.step === newInstructionStep
		);

		instructions[originalInstructionIndex] = {
			...instructions[originalInstructionIndex],
			nextInstructionId: targetInstruction.id,
		};

		// Instruction that conflicts with the replaced one
		const conflictedInstruction = instructions.findIndex(
			(item) =>
				item.nextInstructionId ===
					instructions[originalInstructionIndex].nextInstructionId &&
				item.id !== instruction.id
		);

		if (conflictedInstruction !== -1) {
			instructions[conflictedInstruction] = {
				...instructions[conflictedInstruction],
				nextInstructionId: instruction.id,
			};
		}

		return instructions;
	}

	private normalize(instructions: Instruction[]) {
		let currentPointedInstructionId = null;

		for (let step = instructions.length; step >= 1; step--) {
			const currentInstructionIndex = instructions.findIndex(
				(item) => item.nextInstructionId === currentPointedInstructionId
			);

			instructions[currentInstructionIndex] = {
				...instructions[currentInstructionIndex],
				step,
			};

			currentPointedInstructionId = instructions[currentInstructionIndex].id;
		}

		return instructions;
	}
}
