import { Response, Request, RequestHandler, NextFunction } from "express";

import { IndexAnalysisUseCase } from "./IndexAnalysisUseCase";

export class IndexAnalysisController {
	constructor(
		private useCase: IndexAnalysisUseCase,
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
			const { testbenchid } = request.headers;

			const message = await this.useCase.execute({
				testBenchId: testbenchid as string,
			});

			return response.status(201).json(message).send();
		} catch (error) {
			return response.status(error.status || 500).json({
				message: error.message || "Unexpected error!",
			});
		}
	}
}
