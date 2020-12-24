import { CAO } from "src/entities/CAO/CAO";
import { CAOItem } from "src/entities/CAOItem/CAOItem";

export class CAOFactory {
	static create(cao: CAO) {
		const instantiatedCAO = new CAO(
			{
				...cao,
				items: cao.items.map((item) => new CAOItem(item, item.id)),
			},
			cao.id
		);

		return instantiatedCAO;
	}
}
