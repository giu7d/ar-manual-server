import { Entity, OneToMany, PrimaryColumn } from "typeorm";

import { CAOItemORM } from "src/entities/CAOItem/CAOItemORM";

import { CAO } from "./CAO";

@Entity("cao")
export class CAOORM extends CAO {
	@PrimaryColumn({
		type: "uuid",
		unique: true,
	})
	id: string;

	@OneToMany(() => CAOItemORM, (item) => item.cao)
	items: CAOItemORM[];
}
