import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { InstructionORM } from "src/entities/Instruction/InstructionORM";

import { InstructionSource } from "./InstructionSource";

@Entity("instruction_source")
export class InstructionSourceORM extends InstructionSource {
	@PrimaryColumn({
		type: "uuid",
		unique: true,
	})
	id: string;

	@Column()
	type: "image" | "video" | "AR";

	@Column()
	src: string;

	@Column()
	instructionId: string;

	@ManyToOne(() => InstructionORM, (instruction) => instruction.sources)
	@JoinColumn({ name: "instructionId", referencedColumnName: "id" })
	instruction: InstructionORM;
}
