import { Column, Entity, PrimaryColumn } from "typeorm";

import { CAOItem } from "src/entities/CAOItem/CAOItem";

import { CAO } from "./CAO";

@Entity("cao")
export class CAOORM extends CAO {
	@PrimaryColumn({
		type: "uuid",
		unique: true,
	})
	id: string;

	@Column()
	description: string;

	@Column({ type: "json" })
	items: CAOItem[];

	constructor(props: CAO) {
		super(props);
		Object.assign(this, props);
	}
}
