import { PGInstructionRepository } from "src/repositories/Instruction/implementations/PGInstructionRepository";

import { ModifyInstructionController } from "./ModifyInstructionController";
import { ModifyInstructionUseCase } from "./ModifyInstructionUseCase";
import { modifyInstructionValidatorHandler } from "./ModifyInstructionValidator";

const modifyInstructionUseCase = new ModifyInstructionUseCase(
	new PGInstructionRepository()
);

export const modifyInstructionController = new ModifyInstructionController(
	modifyInstructionUseCase,
	modifyInstructionValidatorHandler
);
