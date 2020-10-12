import { v4 as uuid } from "uuid";

export class Warning {
	readonly id: string;

	description: string;

	createdAt: Date;

	constructor(props: Omit<Warning, "id">, id?: string) {
		Object.assign(this, props);

		if (!id) {
			this.id = uuid();
		}
	}
}
