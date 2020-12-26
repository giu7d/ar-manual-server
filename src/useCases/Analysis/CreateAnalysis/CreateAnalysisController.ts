import { Response, Request, RequestHandler, NextFunction } from "express";

import { extractBearerTokenData } from "src/utils";

import { CreateAnalysisUseCase } from "./CreateAnalysisUseCase";

export class CreateAnalysisController {
	constructor(
		private useCase: CreateAnalysisUseCase,
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
			const { authorization, testbenchid } = request.headers;
			const account = extractBearerTokenData(authorization);
			const data = request.body;

			const message = await this.useCase.execute({
				accountId: account.data.id,
				testBenchId: testbenchid,
				...data,
			});

			return response.status(201).json(message);
		} catch (error) {
			return response.status(error.status || 500).json({
				message: error.message || "Unexpected error!",
			});
		}
	}
}
