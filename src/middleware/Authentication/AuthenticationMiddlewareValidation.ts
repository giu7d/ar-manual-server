import { celebrate, Joi, Segments } from "celebrate";

export const authenticationMiddlewareValidator = celebrate({
	[Segments.HEADERS]: Joi.object({
		authorization: Joi.string().required(),
	}).unknown(),
});
