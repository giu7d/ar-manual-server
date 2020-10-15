import { celebrate, Joi, Segments } from "celebrate";

import { IModifyInstructionRequestDTO } from "./ModifyInstructionDTO";

export const modifyInstructionValidatorHandler = celebrate({
	[Segments.HEADERS]: Joi.object({
		authorization: Joi.string().required(),
	}).unknown(),
	[Segments.PARAMS]: Joi.object<
		Pick<IModifyInstructionRequestDTO, "testBenchId" | "instructionId">
	>({
		testBenchId: Joi.string().required(),
		instructionId: Joi.string().required(),
	}),
	[Segments.BODY]: Joi.object<
		Omit<IModifyInstructionRequestDTO, "testBenchId" | "instructionId">
	>({
		description: Joi.string().required(),
	}),
});
