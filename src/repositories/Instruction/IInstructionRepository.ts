import { Instruction } from "src/entities/Instruction/Instruction";

export interface IInstructionRepository {
	save(testBenchId: string, instruction: Instruction): Promise<void>;
	modify(
		id: string,
		instruction: Partial<Omit<Instruction, "id">>
	): Promise<void>;
	findById(id: string): Promise<Instruction>;
}
