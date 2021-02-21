import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

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

	@Column()
	startedAt: Date;

	@Column()
	finishedAt: Date;

	@Column({
		default: 0,
	})
	timeDifference: number;

	@ManyToOne(() => AccountORM, (account) => account.analysis)
	account: AccountORM;

	@ManyToOne(() => TestBenchORM, (testBench) => testBench.analysis)
	testBench: TestBenchORM;

	@OneToMany(() => AnalysisStepORM, (data) => data.analysis, { cascade: true })
	steps: AnalysisStepORM[];

	constructor(props: Analysis) {
		super(props);
		Object.assign(this, props);
	}
}
