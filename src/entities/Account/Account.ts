import { v4 as uuid } from "uuid";

export class Account {
	readonly id: string;

	firstName: string;

	lastName: string;

	email: string;

	password: string;

	salt: string;

	constructor(props: Omit<Account, "id">, id?: string) {
		Object.assign(this, props);

		if (!id) {
			this.id = uuid();
		}
	}
}
