import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

import { AnalysisORM } from "src/entities//Analysis/AnalysisORM";
import { InstructionORM } from "src/entities/Instruction/InstructionORM";

import { AnalysisStep } from "./AnalysisStep";

@Entity("analysis_step")
export class AnalysisStepORM extends AnalysisStep {
	@PrimaryColumn({
		type: "uuid",
		unique: true,
	})
	id: string;

	@Column()
	status: "approved" | "failure";

	@Column({
		type: "json",
		nullable: true,
	})
	failure?: {
		description?: string;
		src: string[];
		caoItemId: string;
	};

	@Column()
	startedAt: Date;

	@Column()
	finishedAt: Date;

	@ManyToOne(() => AnalysisORM, (analysis) => analysis.steps)
	analysis: AnalysisORM;

	@ManyToOne(() => InstructionORM, (instruction) => instruction.analysisStep)
	instruction: InstructionORM;

	constructor(props: AnalysisStep) {
		super(props);
		Object.assign(this, props);
	}
}
