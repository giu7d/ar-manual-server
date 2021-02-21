import { celebrate, Joi, Segments } from "celebrate";

export const permissionMiddlewareValidator = celebrate({
	[Segments.HEADERS]: Joi.object({
		"api-account-id": Joi.string().required(),
		"Client-Type": Joi.string()
			.valid("ANALYSIS_MOBILE_APP", "MANAGEMENT_WEB_APP")
			.required(),
	}).unknown(),
});
