import { celebrate, Joi, Segments } from "celebrate";

import { ICreateTestBenchRequestDTO } from "./CreateTestBenchDTO";

export const createTestBenchValidatorHandler = celebrate({
	[Segments.HEADERS]: Joi.object({
		authorization: Joi.string().required(),
	}).unknown(),
	[Segments.BODY]: Joi.object<ICreateTestBenchRequestDTO>({
		testBenchSerialNumber: Joi.string().required(),
		componentSerialNumber: Joi.string().required(),
		instructions: Joi.array()
			.items(
				Joi.object({
					step: Joi.number().required(),
					description: Joi.string().required(),
					sources: Joi.array()
						.items(
							Joi.object({
								type: Joi.string().allow("image", "video", "AR").required(),
								src: Joi.string().required(),
							})
						)
						.required(),
					warnings: Joi.array()
						.items(
							Joi.object({
								description: Joi.string().required(),
							})
						)
						.required(),
				})
			)
			.required(),
		cao: Joi.object({
			description: Joi.string().required(),
			items: Joi.array()
				.items(
					Joi.object({
						description: Joi.string().required(),
						frequency: Joi.string().required(),
						series: Joi.string().required(),
						reforce: Joi.string().required(),
						method: Joi.string().required(),
						conformity: Joi.string().required(),
					})
				)
				.required(),
		}).required(),
	}),
});
