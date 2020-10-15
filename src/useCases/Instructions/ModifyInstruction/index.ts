import { PGInstructionRepository } from "src/repositories/Instruction/implementations/PGInstructionRepository";
import { PGTestBenchRepository } from "src/repositories/TestBench/implementations/PGTestBenchRepository";

import { ModifyInstructionController } from "./ModifyInstructionController";
import { ModifyInstructionUseCase } from "./ModifyInstructionUseCase";
import { modifyInstructionValidatorHandler } from "./ModifyInstructionValidator";

const modifyInstructionUseCase = new ModifyInstructionUseCase(
	new PGTestBenchRepository(),
	new PGInstructionRepository()
);

export const modifyInstructionController = new ModifyInstructionController(
	modifyInstructionUseCase,
	modifyInstructionValidatorHandler
);
