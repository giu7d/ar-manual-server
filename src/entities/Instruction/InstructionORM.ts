import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

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
	title: string;

	@Column()
	description: string;

	@Column()
	step: number;

	@Column({
		default: "GEOMETRIC-INSPECTION",
	})
	inspectionType: "VISUAL-INSPECTION" | "GEOMETRIC-INSPECTION";

	@Column({
		nullable: true,
	})
	nextInstructionId?: string;

	@OneToMany(() => InstructionSourceORM, (source) => source.instruction, {
		cascade: true,
		onUpdate: "CASCADE",
	})
	sources: InstructionSourceORM[];

	@OneToMany(() => WarningORM, (warning) => warning.instruction, {
		cascade: true,
		onUpdate: "CASCADE",
	})
	warnings: WarningORM[];

	@OneToMany(() => AnalysisStepORM, (step) => step.instruction)
	analysisStep: AnalysisStepORM[];

	@ManyToOne(() => TestBenchORM, (testBench) => testBench.instructions)
	testBench: TestBenchORM;

	constructor(props: Instruction) {
		super(props);
		Object.assign(this, props);
	}
}
