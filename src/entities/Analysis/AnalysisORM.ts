import {
	Column,
	Entity,
	JoinColumn,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryColumn,
} from "typeorm";

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
	testBenchId: string;

	@ManyToOne(() => TestBenchORM, (testBench) => testBench.analysis)
	@JoinColumn({ name: "testBenchId", referencedColumnName: "id" })
	testBench: TestBenchORM;

	@OneToMany(() => AnalysisStepORM, (data) => data.analysis, { cascade: true })
	steps: AnalysisStepORM[];

	@Column()
	startedAt: Date;

	@Column()
	finishedAt: Date;

	@Column()
	accountId: string;

	@ManyToOne(() => AccountORM, (account) => account.analysis)
	@JoinColumn({ name: "accountId", referencedColumnName: "id" })
	account: AccountORM;
}
