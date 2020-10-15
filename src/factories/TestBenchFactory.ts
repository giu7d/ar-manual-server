import { CAO } from "src/entities/CAO/CAO";
import { CAOItem } from "src/entities/CAOItem/CAOItem";
import { Instruction } from "src/entities/Instruction/Instruction";
import { InstructionSource } from "src/entities/InstructionSource/InstructionSource";
import { TestBench } from "src/entities/TestBench/TestBench";
import { Warning } from "src/entities/Warning/Warning";
import { ICreateTestBenchRequestDTO } from "src/useCases/TestBenches/CreateTestBench/CreateTestBenchDTO";

export class TestBenchFactory {
	static create({ instructions, cao, ...rest }: ICreateTestBenchRequestDTO) {
		let lastInstructionId = undefined;
		let lastInstructionStep = instructions.length;

		const instantiatedInstructions = instructions
			.sort((present, next) => {
				return next.step - present.step;
			})
			.map(({ sources, warnings, ...rest }) => {
				const instruction = new Instruction({
					...rest,
					step: lastInstructionStep,
					sources: sources.map((src) => new InstructionSource(src)),
					warnings: warnings.map((warning) => new Warning(warning)),
					nextInstructionId: lastInstructionId,
				});

				lastInstructionId = instruction.id;
				lastInstructionStep--;

				return instruction;
			});

		const instantiatedCAO = new CAO({
			...cao,
			items: cao.items.map((item) => new CAOItem(item)),
		});

		const instantiatedTestBench = new TestBench({
			...rest,
			instructions: instantiatedInstructions,
			cao: instantiatedCAO,
		});

		return instantiatedTestBench;
	}
}
