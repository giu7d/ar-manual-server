import { Response, Request, RequestHandler, NextFunction } from "express";

import { CreateAccountUseCase } from "./CreateAccountUseCase";

export class CreateAccountController {
	constructor(
		private createAccountUseCase: CreateAccountUseCase,
		private createAccountValidator: RequestHandler
	) {}

	validator(
		request: Request,
		response: Response,
		next: NextFunction
	): RequestHandler {
		return this.createAccountValidator(request, response, next);
	}

	async handle(request: Request, response: Response): Promise<Response> {
		try {
			const data = request.body;
			await this.createAccountUseCase.execute(data);

			return response.status(201).send();
		} catch (error) {
			return response.status(400).json({
				message: error.message || "Unexpected error.",
			});
		}
	}
}
