import { Response, Request, RequestHandler, NextFunction } from "express";

import { ShowAccountUseCase } from "./ShowAccountUseCase";

export class ShowAccountController {
	constructor(
		private useCase: ShowAccountUseCase,
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
			const { accountId } = request.params;
			const message = await this.useCase.execute({ id: accountId });

			return response.status(200).json(message);
		} catch (error) {
			return response.status(error.status || 500).json({
				message: error.message || "Unexpected error!",
			});
		}
	}
}
