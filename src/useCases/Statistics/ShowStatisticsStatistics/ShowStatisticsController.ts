import { Response, Request, RequestHandler, NextFunction } from "express";

import { ShowStatisticsUseCase } from "./ShowStatisticsUseCase";

export class ShowStatisticsController {
	constructor(
		private useCase: ShowStatisticsUseCase,
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
			const message = await this.useCase.execute({ testBenchId });

			return response.status(200).json(message);
		} catch (error) {
			return response.status(error.status || 500).json({
				message: error.message || "Unexpected error!",
			});
		}
	}
}
