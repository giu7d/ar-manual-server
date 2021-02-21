import { v4 as uuid } from "uuid";

import { Account } from "src/entities/Account/Account";
import { AnalysisStep } from "src/entities/AnalysisStep/AnalysisStep";
import { TestBench } from "src/entities/TestBench/TestBench";

export class Analysis {
	readonly id: string;

	status: "approved" | "failure";

	testBench: TestBench;

	account: Account;

	steps: AnalysisStep[];

	startedAt: Date;

	finishedAt: Date;

	timeDifference: number;

	constructor(props: Omit<Analysis, "id">, id?: string) {
		Object.assign(this, props);

		if (!id) {
			this.id = uuid();
		}
	}
}
