import { v4 as uuid } from "uuid";

import { Instruction } from "src/entities/Instruction/Instruction";

export class AnalysisStep {
	readonly id: string;

	status: "approved" | "failure";

	instruction: Instruction;

	failure?: {
		description?: string;
		src: string[];
		caoItemId: string;
	};

	startedAt: Date;

	finishedAt: Date;

	constructor(props: Omit<AnalysisStep, "id">, id?: string) {
		Object.assign(this, props);

		if (!id) {
			this.id = uuid();
		}
	}
}
