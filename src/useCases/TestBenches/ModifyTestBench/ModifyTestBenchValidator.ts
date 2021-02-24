import { celebrate, Joi, Segments } from "celebrate";

import { CAO } from "src/entities/CAO/CAO";
import { CAOItem } from "src/entities/CAOItem/CAOItem";
import { Instruction } from "src/entities/Instruction/Instruction";
import { InstructionSource } from "src/entities/InstructionSource/InstructionSource";
import { Warning } from "src/entities/Warning/Warning";

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
		thumbnailSrc: Joi.string().uri(),
		instructions: Joi.array().items(
			Joi.object<Instruction>({
				id: Joi.string(),
				step: Joi.number().required(),
				nextInstructionId: Joi.string(),
				title: Joi.string().required(),
				description: Joi.string().required(),
				inspectionType: Joi.string()
					.valid("VISUAL-INSPECTION", "GEOMETRIC-INSPECTION")
					.required(),
				sources: Joi.array()
					.items(
						Joi.object<InstructionSource>({
							id: Joi.string(),
							type: Joi.string().allow("image", "video", "3D").required(),
							src: Joi.string().required(),
						})
					)
					.required(),
				warnings: Joi.array()
					.items(
						Joi.object<Warning>({
							id: Joi.string(),
							createdAt: Joi.date(),
							description: Joi.string().required(),
						})
					)
					.default([]),
			})
		),
		cao: Joi.object<CAO>({
			id: Joi.string(),
			description: Joi.string().required(),
			items: Joi.array()
				.items(
					Joi.object<CAOItem>({
						id: Joi.string(),
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
		}),
	}),
});
