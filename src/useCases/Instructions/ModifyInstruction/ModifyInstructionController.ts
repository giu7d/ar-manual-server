import { Response, Request, RequestHandler, NextFunction } from "express";

import { ModifyInstructionUseCase } from "./ModifyInstructionUseCase";

export class ModifyInstructionController {
	constructor(
		private useCase: ModifyInstructionUseCase,
		private validatorHandler: RequestHandler
	) {}

	validator(
		request: Request,
		response: Response,
		next: NextFunction
	): RequestHandler {
		return this.validatorHandler(request, response, next);
	}

	async handle(request: Request, response: Response): Promise<Response> {
		try {
			const { testBenchId, instructionId } = request.params;
			const data = request.body;

			const message = await this.useCase.execute({
				testBenchId,
				instructionId,
				...data,
			});

			return response.status(200).json(message).send();
		} catch (error) {
			return response.status(error.status || 500).json({
				message: error.message || "Unexpected error!",
				stack: error.stack || "No error stack available!",
			});
		}
	}
}
