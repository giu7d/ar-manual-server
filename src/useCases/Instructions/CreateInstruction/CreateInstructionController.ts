import { Response, Request, RequestHandler, NextFunction } from "express";

import { CreateInstructionUseCase } from "./CreateInstructionUseCase";

export class CreateInstructionController {
	constructor(
		private useCase: CreateInstructionUseCase,
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
			const { testBenchId } = request.params;
			const data = request.body;

			const message = await this.useCase.execute({ testBenchId, ...data });

			return response.status(201).json(message).send();
		} catch (error) {
			return response.status(error.status || 500).json({
				message: error.message || "Unexpected error!",
				stack: error.stack || "No error stack available!",
			});
		}
	}
}
