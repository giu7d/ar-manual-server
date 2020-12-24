import { getRepository, Repository } from "typeorm";

import { InstructionSource } from "src/entities/InstructionSource/InstructionSource";
import { InstructionSourceORM } from "src/entities/InstructionSource/InstructionSourceORM";

import { IInstructionSourceRepository } from "../IInstructionSourceRepository";

export class PGInstructionSourceRepository
	implements IInstructionSourceRepository {
	private repository(): Repository<InstructionSourceORM> {
		return getRepository(InstructionSourceORM);
	}

	async save(instructionId: string, instructionSource: InstructionSource) {
		await this.repository().save(instructionSource);
	}
}
