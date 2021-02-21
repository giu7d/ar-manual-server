import {
	Column,
	Entity,
	JoinColumn,
	OneToMany,
	OneToOne,
	PrimaryColumn,
} from "typeorm";

import { AnalysisORM } from "src/entities/Analysis/AnalysisORM";
import { CAOORM } from "src/entities/CAO/CAOORM";
import { InstructionORM } from "src/entities/Instruction/InstructionORM";

import { TestBench } from "./TestBench";

@Entity("testbench")
export class TestBenchORM extends TestBench {
	@PrimaryColumn({
		type: "uuid",
		unique: true,
	})
	id: string;

	@Column()
	componentSerialNumber: string;

	@Column()
	testBenchSerialNumber: string;

	@Column({
		default: "placeholder-value",
	})
	thumbnailSrc: string;

	@Column({
		default: "placeholder-value",
	})
	qrCodeSrc: string;

	@Column({
		default: true,
	})
	isActive: boolean;

	@OneToMany(() => InstructionORM, (data) => data.testBench, {
		cascade: true,
		onUpdate: "CASCADE",
	})
	instructions: InstructionORM[];

	@OneToOne(() => CAOORM, { cascade: true })
	@JoinColumn()
	cao: CAOORM;

	@OneToMany(() => AnalysisORM, (analysis) => analysis.testBench)
	analysis: AnalysisORM[];

	constructor(props: TestBench) {
		super(props);
		Object.assign(this, props);
	}
}
