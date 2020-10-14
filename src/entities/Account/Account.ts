import { v4 as uuid } from "uuid";

export class Account {
	readonly id: string;

	firstName: string;

	lastName: string;

	email: string;

	password: string;

	salt: string;

	isActive: boolean;

	constructor(
		props: Omit<Account, "id" | "isActive">,
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
