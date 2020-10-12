import { celebrate, Joi, Segments } from "celebrate";

import { DTO } from "./CreateTestBenchDTO";

export const validatorHandler = celebrate({
	[Segments.BODY]: Joi.object<DTO>({
		id: Joi.string().required(),
	}),
});
