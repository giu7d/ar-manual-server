import { PGInstructionRepository } from "src/repositories/Instruction/implementations/PGInstructionRepository";
import { PGTestBenchRepository } from "src/repositories/TestBench/implementations/PGTestBenchRepository";

import { CreateInstructionController } from "./CreateInstructionController";
import { CreateInstructionUseCase } from "./CreateInstructionUseCase";
import { createInstructionValidatorHandler } from "./CreateInstructionValidator";

const createInstructionUseCase = new CreateInstructionUseCase(
	new PGTestBenchRepository(),
	new PGInstructionRepository()
);

export const createInstructionController = new CreateInstructionController(
	createInstructionUseCase,
	createInstructionValidatorHandler
);
