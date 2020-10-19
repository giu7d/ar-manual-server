import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryColumn,
} from "typeorm";

import { AnalysisStepORM } from "src/entities/AnalysisStep/AnalysisStepORM";
import { InstructionSourceORM } from "src/entities/InstructionSource/InstructionSourceORM";
import { TestBenchORM } from "src/entities/TestBench/TestBenchORM";
import { WarningORM } from "src/entities/Warning/WarningORM";

import { Instruction } from "./Instruction";

@Entity("instruction")
export class InstructionORM extends Instruction {
	@PrimaryColumn({
		type: "uuid",
		unique: true,
	})
	id: string;

	@Column()
	description: string;

	@Column()
	step: number;

	@Column({
		nullable: true,
	})
	nextInstructionId?: string;

	@OneToMany(() => InstructionSourceORM, (source) => source.instruction, {
		cascade: true,
	})
	sources: InstructionSourceORM[];

	@OneToMany(() => WarningORM, (warning) => warning.instruction, {
		cascade: true,
	})
	warnings: WarningORM[];

	@Column()
	testBenchId: string;

	@ManyToOne(() => TestBenchORM, (testBench) => testBench.instructions)
	@JoinColumn({ name: "testBenchId", referencedColumnName: "id" })
	testBench: TestBenchORM;

	@OneToMany(() => AnalysisStepORM, (step) => step.instruction)
	analysisStep: AnalysisStepORM[];
}
