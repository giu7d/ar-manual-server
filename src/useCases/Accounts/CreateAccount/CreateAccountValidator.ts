import { Joi, celebrate, Segments } from "celebrate";

import { ICreateAccountRequestDTO } from "./CreateAccountDTO";

export const createAccountValidator = celebrate({
	[Segments.BODY]: Joi.object<ICreateAccountRequestDTO>({
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	}),
});
