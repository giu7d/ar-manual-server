import { celebrate, Joi, Segments } from "celebrate";

export const indexTestBenchValidatorHandler = celebrate({
	[Segments.HEADERS]: Joi.object({
		authorization: Joi.string().required(),
	}).unknown(),
});
