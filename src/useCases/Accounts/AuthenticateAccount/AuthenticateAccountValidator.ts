import { Joi, celebrate, Segments } from "celebrate";

import { IAuthenticateAccountRequestDTO } from "./AuthenticateAccountDTO";

export const authenticateAccountValidator = celebrate({
	[Segments.BODY]: Joi.object<IAuthenticateAccountRequestDTO>({
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	}),
});
