import { celebrate, Joi, Segments } from "celebrate";

export const indexAnalysisValidatorHandler = celebrate({
	[Segments.HEADERS]: Joi.object({
		authorization: Joi.string().required(),
		testbenchid: Joi.string().required(),
	}).unknown(),
});
