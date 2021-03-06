import { v4 as uuid } from "uuid";

import { Instruction } from "src/entities/Instruction/Instruction";

export class AnalysisStep {
	readonly id: string;

	status: "approved" | "failure";

	instruction: Instruction;

	failure?: {
		src: string[];
	};

	startedAt: Date;

	finishedAt: Date;

	timeDifference: number;

	constructor(props: Omit<AnalysisStep, "id">, id?: string) {
		Object.assign(this, props);

		if (!id) {
			this.id = uuid();
		}
	}
}
