import { celebrate, Joi, Segments } from "celebrate";

import { IShowStatisticsRequestDTO } from "./ShowStatisticsDTO";

export const showStatisticsValidatorHandler = celebrate({
	[Segments.HEADERS]: Joi.object({
		authorization: Joi.string().required(),
	}).unknown(),
	[Segments.PARAMS]: Joi.object<IShowStatisticsRequestDTO>({
		testBenchId: Joi.string().required(),
	}),
});
