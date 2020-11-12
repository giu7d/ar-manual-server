import { v4 as uuid } from "uuid";

import { CAO } from "src/entities/CAO/CAO";
import { Instruction } from "src/entities/Instruction/Instruction";

export class TestBench {
	readonly id: string;

	testBenchSerialNumber: string;

	componentSerialNumber: string;

	thumbnailSrc: string;

	qrCodeSrc?: string;

	cao: CAO;

	instructions: Instruction[];

	isActive: boolean;

	constructor(
		props: Omit<TestBench, "id" | "isActive" | "qrCodeSrc">,
		id?: string,
		isActive?: boolean,
		qrCodeSrc?: string
	) {
		Object.assign(this, props);

		this.isActive = isActive || true;

		this.qrCodeSrc = qrCodeSrc;

		if (!id) {
			this.id = uuid();
		}
	}
}
