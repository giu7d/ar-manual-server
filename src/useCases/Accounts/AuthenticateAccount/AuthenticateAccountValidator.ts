import { Joi, celebrate, Segments } from "celebrate";

import { IAuthenticateAccountRequestDTO } from "./AuthenticateAccountDTO";

export const authenticateAccountValidator = celebrate({
	[Segments.HEADERS]: Joi.object({
		"client-type": Joi.string()
			.valid("ANALYSIS_MOBILE_APP", "MANAGEMENT_WEB_APP")
			.required(),
	}).unknown(),
	[Segments.BODY]: Joi.object<IAuthenticateAccountRequestDTO>({
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	}),
});
