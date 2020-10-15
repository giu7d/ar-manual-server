import { InstructionSource } from "src/entities/InstructionSource/InstructionSource";

export interface IInstructionSourceRepository {
	save(
		instructionId: string,
		instructionSource: InstructionSource
	): Promise<void>;
}
