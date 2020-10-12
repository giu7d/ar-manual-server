import {
	Column,
	Entity,
	JoinColumn,
	OneToMany,
	OneToOne,
	PrimaryColumn,
} from "typeorm";

import { InstructionSourceORM } from "src/entities/InstructionSource/InstructionSourceORM";
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

	@OneToOne(() => InstructionORM)
	@JoinColumn()
	nextStep: InstructionORM;

	@OneToMany(() => InstructionSourceORM, (source) => source.instruction)
	sources: InstructionSourceORM[];

	@OneToMany(() => WarningORM, (warning) => warning.instruction)
	warnings: WarningORM[];
}
