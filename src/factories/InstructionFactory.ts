import { omit } from "lodash";

import { Instruction } from "src/entities/Instruction/Instruction";
import { InstructionSource } from "src/entities/InstructionSource/InstructionSource";
import { Warning } from "src/entities/Warning/Warning";
import { ICreateInstructionRequestDTO } from "src/useCases/Instructions/CreateInstruction/CreateInstructionDTO";

export class InstructionFactory {
	static create(step: number, instruction: ICreateInstructionRequestDTO) {
		const instantiatedInstructions = new Instruction({
			...omit(instruction, "testBenchId"),
			sources: instruction.sources.map((src) => new InstructionSource(src)),
			warnings: instruction.warnings.map((warning) => new Warning(warning)),
			step,
			nextInstructionId: undefined,
		});

		return instantiatedInstructions;
	}
}
