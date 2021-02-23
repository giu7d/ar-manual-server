import { CAO } from "src/entities/CAO/CAO";
import { Instruction } from "src/entities/Instruction/Instruction";
import { TestBench } from "src/entities/TestBench/TestBench";
import { ICreateTestBenchRequestDTO } from "src/useCases/TestBenches/CreateTestBench/CreateTestBenchDTO";

import { CAOFactory } from "./CAOFactory";
import { InstructionsFactory } from "./InstructionsFactory";

export class TestBenchFactory {
	static create({
		instructions = [],
		cao,
		...testBench
	}: ICreateTestBenchRequestDTO) {
		const instantiatedInstructions = InstructionsFactory.create(
			instructions as Instruction[]
		);

		const instantiatedCAO = !cao
			? new CAO({
					description: "no description",
					items: [],
			  })
			: CAOFactory.create(cao as CAO);

		const instantiatedTestBench = new TestBench({
			...testBench,
			instructions: instantiatedInstructions,
			cao: instantiatedCAO,
		});

		return instantiatedTestBench;
	}
}
