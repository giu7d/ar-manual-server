import { v4 as uuid } from "uuid";

export class Account {
	public readonly id: string;
	public firstName: string;
	public lastName: string;
	public email: string;
	public password: string;
	public salt: string;

	constructor(props: Omit<Account, "id">, id?: string) {
		Object.assign(this, props);

		if (!id) {
			this.id = uuid();
		}
	}
}
