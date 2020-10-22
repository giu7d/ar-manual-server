import { Joi, celebrate, Segments } from "celebrate";

export const uploadFilesValidator = celebrate({
	[Segments.HEADERS]: Joi.object({
		"content-type": Joi.string()
			.regex(/multipart\/form-data/)
			.required(),
		authorization: Joi.string().required(),
	}).unknown(),
});
