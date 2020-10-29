import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";

import { AnalysisORM } from "src/entities/Analysis/AnalysisORM";

import { Account } from "./Account";

const toLowercase = {
	from: (value: string) => value,
	to: (value: string) => value.toLowerCase(),
};

@Entity("account")
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

	@Column({
		default: true,
	})
	isActive: boolean;

	@OneToMany(() => AnalysisORM, (analysis) => analysis.account)
	analysis: AnalysisORM[];
}
