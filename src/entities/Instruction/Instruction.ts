import { v4 as uuid } from "uuid";

import { InstructionSource } from "src/entities/InstructionSource/InstructionSource";
import { Warning } from "src/entities/Warning/Warning";

export class Instruction {
	readonly id: string;

	description: string;

	step: number;

	nextInstructionId?: string;

	sources: InstructionSource[];

	warnings: Warning[];

	constructor(props: Omit<Instruction, "id">, id?: string) {
		Object.assign(this, props);

		if (!id) {
			this.id = uuid();
		}
	}
}
