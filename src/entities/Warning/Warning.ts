import { v4 as uuid } from "uuid";

export class Warning {
	readonly id: string;

	description: string;

	createdAt: Date;

	constructor(
		props: Omit<Warning, "id" | "createdAt">,
		id?: string,
		createdAt?: Date
	) {
		Object.assign(this, props);

		this.createdAt = createdAt || new Date();

		if (!id) {
			this.id = uuid();
		}
	}
}
