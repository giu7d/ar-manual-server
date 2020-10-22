import { celebrate, Joi, Segments } from "celebrate";

import { ICreateInstructionRequestDTO } from "./CreateInstructionDTO";

export const createInstructionValidatorHandler = celebrate({
	[Segments.HEADERS]: Joi.object({
		authorization: Joi.string().required(),
	}).unknown(),
	[Segments.PARAMS]: Joi.object<
		Pick<ICreateInstructionRequestDTO, "testBenchId">
	>({
		testBenchId: Joi.string().required(),
	}).unknown(),
	[Segments.BODY]: Joi.object<
		Omit<ICreateInstructionRequestDTO, "testBenchId">
	>({
		description: Joi.string().required(),
		sources: Joi.array()
			.items(
				Joi.object({
					type: Joi.string().allow("image", "video", "AR").required(),
					src: Joi.string().required(),
				})
			)
			.required(),
		warnings: Joi.array().items(
			Joi.object({
				description: Joi.string().required(),
			})
		),
	}),
});
