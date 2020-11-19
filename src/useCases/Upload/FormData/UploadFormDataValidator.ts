import { Joi, celebrate, Segments } from "celebrate";

export const uploadFormDataValidator = celebrate({
	[Segments.HEADERS]: Joi.object({
		authorization: Joi.string().required(),
	}).unknown(),
	[Segments.PARAMS]: Joi.object({
		folder: Joi.string()
			.valid("instructions", "failures", "thumbnails")
			.required(),
	}),
});
