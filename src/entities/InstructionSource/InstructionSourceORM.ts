import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

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
	type: "image" | "video" | "3D";

	@Column()
	src: string;

	@ManyToOne(() => InstructionORM, (instruction) => instruction.sources)
	instruction: InstructionORM;

	constructor(props: InstructionSource) {
		super(props);
		Object.assign(this, props);
	}
}
