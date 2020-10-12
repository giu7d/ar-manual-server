import { Joi, celebrate, Segments } from "celebrate";

export const deleteAccountValidator = celebrate({
	[Segments.PARAMS]: Joi.object({
		accountId: Joi.string().uuid().required(),
	}),
});
