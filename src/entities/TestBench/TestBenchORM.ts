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

	@Column({
		default: true,
	})
	isActive: boolean;

	@OneToMany(() => InstructionORM, (data) => data.testBench, { cascade: true })
	instructions: InstructionORM[];

	@OneToOne(() => CAOORM, { cascade: true })
	@JoinColumn()
	cao: CAOORM;
}
