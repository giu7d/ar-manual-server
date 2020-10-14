import { Joi, celebrate, Segments } from "celebrate";

export const deleteAccountValidator = celebrate({
	[Segments.HEADERS]: Joi.object({
		authorization: Joi.string().required(),
	}).unknown(),
	[Segments.PARAMS]: Joi.object({
		accountId: Joi.string().uuid().required(),
	}),
});
