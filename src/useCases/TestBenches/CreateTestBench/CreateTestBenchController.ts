import { Response, Request, RequestHandler, NextFunction } from "express";

import { CreateTestBenchUseCase } from "./CreateTestBenchUseCase";

export class CreateTestBenchController {
	constructor(
		private useCase: CreateTestBenchUseCase,
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
			const data = request.body;
			const message = await this.useCase.execute(data);

			return response.status(201).json(message);
		} catch (error) {
			return response.status(error.status || 500).json({
				message: error.message || "Unexpected error!",
			});
		}
	}
}
