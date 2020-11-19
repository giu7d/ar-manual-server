import { Joi, celebrate, Segments } from "celebrate";

export const uploadBase64Validator = celebrate({
	[Segments.HEADERS]: Joi.object({
		authorization: Joi.string().required(),
	}).unknown(),
	[Segments.PARAMS]: Joi.object({
		folder: Joi.string()
			.valid("instructions", "failures", "thumbnails")
			.required(),
	}),
	[Segments.BODY]: Joi.object({
		files: Joi.array().items(Joi.string().base64().required()).required(),
	}),
});
