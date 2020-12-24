import { Instruction } from "src/entities/Instruction/Instruction";
import { InstructionSource } from "src/entities/InstructionSource/InstructionSource";
import { Warning } from "src/entities/Warning/Warning";

export class InstructionsFactory {
	static create(instructions: Instruction[]) {
		let lastInstructionId = undefined;
		let lastInstructionStep = instructions.length;

		const instantiatedInstructions = instructions
			.sort((current, next) => {
				return next.step - current.step;
			})
			.map((instruction) => {
				const warnings = instruction.warnings.map((el) => new Warning(el));
				const sources = instruction.sources.map(
					(el) => new InstructionSource(el)
				);

				const instantiatedInstruction = new Instruction(
					{
						...instruction,
						step: lastInstructionStep,
						nextInstructionId: lastInstructionId,
						sources,
						warnings,
					},
					instruction.id
				);

				lastInstructionId = instantiatedInstruction.id;
				lastInstructionStep--;

				return instantiatedInstruction;
			});

		return instantiatedInstructions;
	}
}
