import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from "typeorm";

import { AccountORM } from "src/entities/Account/AccountORM";
import { AnalysisStepORM } from "src/entities/AnalysisStep/AnalysisStepORM";
import { TestBenchORM } from "src/entities/TestBench/TestBenchORM";

import { Analysis } from "./Analysis";

@Entity("analysis")
export class AnalysisORM extends Analysis {
	@PrimaryColumn({
		type: "uuid",
		unique: true,
	})
	id: string;

	@Column()
	status: "approved" | "failure";

	@ManyToMany(() => TestBenchORM)
	testBench: TestBenchORM;

	@OneToMany(() => AnalysisStepORM, (data) => data.analysis)
	steps: AnalysisStepORM[];

	@Column()
	startedAt: Date;

	@Column()
	finishedAt: Date;

	@ManyToMany(() => AccountORM)
	account: AccountORM;
}
