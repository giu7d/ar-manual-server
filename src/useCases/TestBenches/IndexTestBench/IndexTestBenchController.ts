import { Response, Request, RequestHandler, NextFunction } from "express";

import { IndexTestBenchUseCase } from "./IndexTestBenchUseCase";

export class IndexTestBenchController {
	constructor(
		private useCase: IndexTestBenchUseCase,
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
			const message = await this.useCase.execute();

			return response.status(200).json(message);
		} catch (error) {
			return response.status(error.status || 500).json({
				message: error.message || "Unexpected error!",
			});
		}
	}
}
