import {
	Column,
	Entity,
	JoinColumn,
	OneToMany,
	OneToOne,
	PrimaryColumn,
} from "typeorm";

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

	@OneToMany(() => InstructionORM, (data) => data.id)
	instructions: InstructionORM[];

	@OneToOne(() => CAOORM)
	@JoinColumn()
	cao: CAOORM;
}
