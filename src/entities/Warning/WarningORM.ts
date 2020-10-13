import { PrimaryColumn, Column, Entity, ManyToOne, JoinColumn } from "typeorm";

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
	@Column()
	instructionId: string;

	@ManyToOne(() => InstructionORM, (instruction) => instruction.warnings)
	@JoinColumn({ name: "instructionId", referencedColumnName: "id" })
	instruction: InstructionORM;
}
