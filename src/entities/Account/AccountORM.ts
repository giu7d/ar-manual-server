import { Entity, PrimaryColumn, Column } from "typeorm";

import { Account } from "./Account";

const toLowercase = {
	from: (value: string) => value,
	to: (value: string) => value.toLowerCase(),
};

@Entity()
export class AccountORM extends Account {
	@PrimaryColumn({
		type: "uuid",
		unique: true,
	})
	id: string;

	@Column({
		transformer: toLowercase,
	})
	firstName: string;

	@Column({
		transformer: toLowercase,
	})
	lastName: string;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@Column()
	salt: string;
}
