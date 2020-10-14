import { Response, Request, RequestHandler, NextFunction } from "express";

import { ModifyTestBenchUseCase } from "./ModifyTestBenchUseCase";

export class ModifyTestBenchController {
	constructor(
		private useCase: ModifyTestBenchUseCase,
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
			await this.useCase.execute({ testBenchId, ...data });

			return response.status(200).send();
		} catch (error) {
			return response.status(error.status || 500).json({
				message: error.message || "Unexpected error!",
				stack: error.stack || "Undefined error stack!",
			});
		}
	}
}
