import { celebrate, Joi, Segments } from "celebrate";

import { IDeleteTestBenchRequestDTO } from "./DeleteTestBenchDTO";

export const deleteTestBenchValidatorHandler = celebrate({
	[Segments.HEADERS]: Joi.object({
		authorization: Joi.string().required(),
	}).unknown(),
	[Segments.PARAMS]: Joi.object<IDeleteTestBenchRequestDTO>({
		testBenchId: Joi.string().required(),
	}),
});
