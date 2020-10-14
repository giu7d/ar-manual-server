import { celebrate, Joi, Segments } from "celebrate";

export const showAccountValidatorHandler = celebrate({
	[Segments.HEADERS]: Joi.object({
		authorization: Joi.string().required(),
	}).unknown(),
	[Segments.PARAMS]: Joi.object({
		accountId: Joi.string().required(),
	}),
});
