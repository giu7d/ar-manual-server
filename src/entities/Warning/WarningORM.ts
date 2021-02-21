import { PrimaryColumn, Column, Entity, ManyToOne } from "typeorm";

import { InstructionORM } from "src/entities/Instruction/InstructionORM";

import { Warning } from "./Warning";

@Entity("warning")
export class WarningORM extends Warning {
	@PrimaryColumn({
		type: "uuid",
		unique: true,
	})
	id: string;

	@Column()
	description: string;

	@Column()
	createdAt: Date;

	@ManyToOne(() => InstructionORM, (instruction) => instruction.warnings)
	instruction: InstructionORM;

	constructor(props: WarningORM) {
		super(props);
		Object.assign(this, props);
	}
}
