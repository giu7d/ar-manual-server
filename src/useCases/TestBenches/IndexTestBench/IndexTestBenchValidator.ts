import { celebrate, Joi, Segments } from "celebrate";

import { DTO } from "./IndexTestBenchDTO";

export const validatorHandler = celebrate({
	[Segments.BODY]: Joi.object<DTO>({
		id: Joi.string().required(),
	}),
});
