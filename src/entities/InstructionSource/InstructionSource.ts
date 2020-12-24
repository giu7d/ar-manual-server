import { v4 as uuid } from "uuid";

export class InstructionSource {
	readonly id: string;

	type: "image" | "video" | "3D";

	src: string;

	constructor(props: Omit<InstructionSource, "id">, id?: string) {
		Object.assign(this, props);

		if (!id) {
			this.id = uuid();
		}
	}
}
