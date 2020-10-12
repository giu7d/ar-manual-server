import { celebrate, Joi, Segments } from "celebrate";

export const showAccountValidatorHandler = celebrate({
	[Segments.PARAMS]: Joi.object({
		accountId: Joi.string().required(),
	}),
});
