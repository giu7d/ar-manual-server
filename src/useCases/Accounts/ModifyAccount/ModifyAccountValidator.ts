import { celebrate, Joi, Segments } from "celebrate";

// import { IModifyAccountRequestDTO } from "./ModifyAccountDTO";

export const modifyAccountValidatorHandler = celebrate({
	[Segments.PARAMS]: Joi.object({
		accountId: Joi.string().required(),
	}),
});
