import { Joi, celebrate, Segments } from "celebrate";

import { IDeleteAccountRequestDTO } from "./DeleteAccountDTO";

export const deleteAccountValidator = celebrate({
	[Segments.PARAMS]: Joi.object<IDeleteAccountRequestDTO>({
		id: Joi.string().uuid().required(),
	}),
});
