import {
	Column,
	Entity,
	JoinColumn,
	ManyToMany,
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

	@Column()
	thumbnailSrc: string;

	@Column({
		default: true,
	})
	isActive: boolean;

	@OneToMany(() => InstructionORM, (data) => data.testBench, { cascade: true })
	instructions: InstructionORM[];

	@OneToOne(() => CAOORM, { cascade: true })
	@JoinColumn()
	cao: CAOORM;

	@ManyToMany(() => AnalysisORM, (analysis) => analysis.testBench)
	analysis: AnalysisORM[];
}
