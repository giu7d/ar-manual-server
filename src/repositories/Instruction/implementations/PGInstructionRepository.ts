import { getRepository, Repository } from "typeorm";

import { Instruction } from "src/entities/Instruction/Instruction";
import { InstructionORM } from "src/entities/Instruction/InstructionORM";

import { IInstructionRepository } from "../IInstructionRepository";

export class PGInstructionRepository implements IInstructionRepository {
	private repository(): Repository<InstructionORM> {
		return getRepository(InstructionORM);
	}

	async save(testBenchId: string, instruction: Instruction) {
		const instructionORM = new InstructionORM(instruction);
		await this.repository().save(instructionORM);
	}

	async modify(id: string, instruction: Partial<Omit<Instruction, "id">>) {
		await this.repository().update({ id }, instruction);
	}

	async findById(id: string) {
		const instruction = await this.repository().findOne({ id });
		return instruction;
	}
}
