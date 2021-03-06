import { celebrate, Joi, Segments } from "celebrate";

import { ICreateAnalysisRequestDTO } from "./CreateAnalysisDTO";

export const createAnalysisValidatorHandler = celebrate({
	[Segments.HEADERS]: Joi.object({
		authorization: Joi.string().required(),
		testbenchid: Joi.string().required(),
	}).unknown(),
	[Segments.BODY]: Joi.object<
		Omit<ICreateAnalysisRequestDTO, "testBenchId" | "accountId">
	>({
		status: Joi.string().valid("approved", "failure").required(),
		startedAt: Joi.date().required(),
		finishedAt: Joi.date().required(),
		steps: Joi.array()
			.items(
				Joi.object({
					instructionId: Joi.string().required(),
					status: Joi.string().valid("approved", "failure").required(),
					startedAt: Joi.date().required(),
					finishedAt: Joi.date().required(),
					failure: Joi.object({
						src: Joi.array().items(Joi.string().required()).required(),
					}),
				})
			)
			.required(),
	}),
});
