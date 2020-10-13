import { v4 as uuid } from "uuid";

import { CAOItem } from "src/entities/CAOItem/CAOItem";

export class CAO {
	readonly id: string;

	description: string;

	items: CAOItem[];

	constructor(props: Omit<CAO, "id">, id?: string) {
		Object.assign(this, props);

		if (!id) {
			this.id = uuid();
		}
	}
}
