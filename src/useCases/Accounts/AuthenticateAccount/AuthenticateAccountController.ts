import { Response, Request, RequestHandler, NextFunction } from "express";

import { AuthenticateAccountUseCase } from "./AuthenticateAccountUseCase";

export class AuthenticateAccountController {
	constructor(
		private authenticateAccountUseCase: AuthenticateAccountUseCase,
		private authenticateAccountValidator: RequestHandler
	) {}

	validator(
		request: Request,
		response: Response,
		next: NextFunction
	): RequestHandler {
		return this.authenticateAccountValidator(request, response, next);
	}

	async handle(request: Request, response: Response): Promise<Response> {
		try {
			const data = request.body;
			const message = await this.authenticateAccountUseCase.execute(data);

			return response.status(200).json(message);
		} catch (error) {
			return response.status(error.status || 500).json({
				message: error.message || "Unexpected error!",
			});
		}
	}
}
