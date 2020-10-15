import { getRepository, Repository } from "typeorm";

import { InstructionSource } from "src/entities/InstructionSource/InstructionSource";
import { InstructionSourceORM } from "src/entities/InstructionSource/InstructionSourceORM";
import { ApplicationError } from "src/utils";

import { IInstructionSourceRepository } from "../IInstructionSourceRepository";

export class PGInstructionSourceRepository
	implements IInstructionSourceRepository {
	private repository(): Repository<InstructionSourceORM> {
		return getRepository(InstructionSourceORM);
	}

	async save(instructionId: string, instructionSource: InstructionSource) {
		if (!instructionId) {
			throw new ApplicationError(400, "Instruction ID needs to be passed!");
		}

		if (!instructionSource) {
			throw new ApplicationError(400, "Instruction Source needs to be passed!");
		}

		await this.repository().save({
			...instructionSource,
			instructionId,
		} as InstructionSourceORM);
	}
}
