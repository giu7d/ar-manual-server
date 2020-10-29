import { v4 as uuid } from "uuid";

export class CAOItem {
	readonly id: string;

	description: string;

	frequency:
		| {
				series: string;
				reforce: string;
		  }
		| string;

	method: string;

	conformity: string;

	constructor(props: Omit<CAOItem, "id">, id?: string) {
		Object.assign(this, props);

		if (!id) {
			this.id = uuid();
		}
	}
}
