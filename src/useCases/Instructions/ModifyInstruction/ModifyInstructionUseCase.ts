import { IInstructionRepository } from "src/repositories/Instruction/IInstructionRepository";

import { IModifyInstructionRequestDTO } from "./ModifyInstructionDTO";

export class ModifyInstructionUseCase {
	constructor(private instructionRepository: IInstructionRepository) {}

	async execute(data: IModifyInstructionRequestDTO) {
		const instruction = await this.instructionRepository.findById(
			data.instructionId
		);

		await this.instructionRepository.modify(instruction.id, {
			description: data.description,
		});
	}
}
