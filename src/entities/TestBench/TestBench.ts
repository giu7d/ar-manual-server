import { v4 as uuid } from "uuid";

import { CAO } from "src/entities/CAO/CAO";
import { Instruction } from "src/entities/Instruction/Instruction";

export class TestBench {
	readonly id: string;

	testBenchSerialNumber: string;

	componentSerialNumber: string;

	thumbnailSrc: string;

	cao: CAO;

	instructions: Instruction[];

	isActive: boolean;

	constructor(
		props: Omit<TestBench, "id" | "isActive">,
		id?: string,
		isActive?: boolean
	) {
		Object.assign(this, props);

		this.isActive = isActive || true;

		if (!id) {
			this.id = uuid();
		}
	}
}
