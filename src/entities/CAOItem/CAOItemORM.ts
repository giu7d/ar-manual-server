import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

import { CAOORM } from "src/entities/CAO/CAOORM";

import { CAOItem } from "./CAOItem";

@Entity("cao_item")
export class CAOItemORM extends CAOItem {
	@PrimaryColumn({
		type: "uuid",
		unique: true,
	})
	id: string;

	@Column()
	description: string;

	@Column()
	frequency: string;

	@Column()
	series: string;

	@Column()
	reforce: string;

	@Column()
	method: string;

	@Column()
	conformity: string;

	@ManyToOne(() => CAOORM, (cao) => cao.items)
	cao: CAOORM;
}
