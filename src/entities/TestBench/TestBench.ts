import { v4 as uuid } from "uuid";

import { CAO } from "src/entities/CAO/CAO";
import { Instruction } from "src/entities/Instruction/Instruction";

export class TestBench {
	readonly id: string;

	testBenchSerialNumber: string;

	componentSerialNumber: string;

	cao: CAO;

	instructions: Instruction[];

	constructor(props: Omit<TestBench, "id">, id?: string) {
		Object.assign(this, props);

		if (!id) {
			this.id = uuid();
		}
	}
}
