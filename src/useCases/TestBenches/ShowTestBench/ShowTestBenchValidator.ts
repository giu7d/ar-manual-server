import { celebrate, Joi, Segments } from "celebrate";

import { IShowTestBenchRequestDTO } from "./ShowTestBenchDTO";

export const showTestBenchValidatorHandler = celebrate({
	[Segments.HEADERS]: Joi.object({
		authorization: Joi.string().required(),
	}).unknown(),
	[Segments.PARAMS]: Joi.object<IShowTestBenchRequestDTO>({
		testBenchId: Joi.string().required(),
	}),
});
