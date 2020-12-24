import { celebrate, Joi, Segments } from "celebrate";

import { ICreateTestBenchRequestDTO } from "./CreateTestBenchDTO";

export const createTestBenchValidatorHandler = celebrate({
	[Segments.HEADERS]: Joi.object({
		authorization: Joi.string().required(),
	}).unknown(),
	[Segments.BODY]: Joi.object<ICreateTestBenchRequestDTO>({
		testBenchSerialNumber: Joi.string().required(),
		componentSerialNumber: Joi.string().required(),
		thumbnailSrc: Joi.string().uri().required(),
		instructions: Joi.array().items(
			Joi.object({
				step: Joi.number().required(),
				title: Joi.string().required(),
				description: Joi.string().required(),
				sources: Joi.array()
					.items(
						Joi.object({
							type: Joi.string().allow("image", "video", "3D").required(),
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
					.default([]),
			})
		),
		cao: Joi.object({
			description: Joi.string().required(),
			items: Joi.array()
				.items(
					Joi.object({
						description: Joi.string().required(),
						frequency: Joi.alternatives(
							Joi.string(),
							Joi.object({
								series: Joi.string().required(),
								reforce: Joi.string().required(),
							})
						).required(),
						method: Joi.string().required(),
						conformity: Joi.string().required(),
					})
				)
				.required(),
		}).required(),
	}),
});
