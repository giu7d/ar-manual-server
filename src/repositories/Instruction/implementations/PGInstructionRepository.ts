import { getRepository, Repository } from "typeorm";

import { Instruction } from "src/entities/Instruction/Instruction";
import { InstructionORM } from "src/entities/Instruction/InstructionORM";
import { ApplicationError } from "src/utils";

import { IInstructionRepository } from "../IInstructionRepository";

export class PGInstructionRepository implements IInstructionRepository {
	private repository(): Repository<InstructionORM> {
		return getRepository(InstructionORM);
	}

	async save(testBenchId: string, instruction: Instruction) {
		if (!testBenchId) {
			throw new ApplicationError(400, "Test Bench ID needs to be passed!");
		}

		if (!instruction) {
			throw new ApplicationError(400, "Instruction needs to be passed!");
		}

		await this.repository().save({
			...instruction,
		} as InstructionORM);
	}

	async modify(id: string, instruction: Partial<Omit<Instruction, "id">>) {
		if (!id) {
			throw new ApplicationError(400, "Instruction ID needs to be passed!");
		}

		if (!instruction) {
			throw new ApplicationError(400, "Instruction needs to be passed!");
		}

		await this.repository().update({ id }, instruction);
	}

	async findById(id: string) {
		if (!id) {
			throw new ApplicationError(400, "Instruction ID needs to be passed!");
		}

		const instruction = await this.repository().findOne({ id });

		return instruction;
	}
}
