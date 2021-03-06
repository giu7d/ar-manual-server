import { Response, Request, RequestHandler, NextFunction } from "express";

import { DeleteTestBenchUseCase } from "./DeleteTestBenchUseCase";

export class DeleteTestBenchController {
	constructor(
		private useCase: DeleteTestBenchUseCase,
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
			await this.useCase.execute({ testBenchId });

			return response.status(200).send();
		} catch (error) {
			return response.status(error.status || 500).json({
				message: error.message || "Unexpected error!",
				stack: error.stack || "Undefined error stack!",
			});
		}
	}
}
