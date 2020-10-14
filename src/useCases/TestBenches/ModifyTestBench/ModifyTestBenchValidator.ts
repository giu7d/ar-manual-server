import { celebrate, Joi, Segments } from "celebrate";

import { IModifyTestBenchRequestDTO } from "./ModifyTestBenchDTO";

export const modifyTestBenchValidatorHandler = celebrate({
	[Segments.HEADERS]: Joi.object({
		authorization: Joi.string().required(),
	}).unknown(),
	[Segments.PARAMS]: Joi.object<
		Pick<IModifyTestBenchRequestDTO, "testBenchId">
	>({
		testBenchId: Joi.string().required(),
	}),
	[Segments.BODY]: Joi.object<Omit<IModifyTestBenchRequestDTO, "testBenchId">>({
		testBenchSerialNumber: Joi.string(),
		componentSerialNumber: Joi.string(),
	}),
});
