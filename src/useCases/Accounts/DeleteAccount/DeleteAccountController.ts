import { Response, Request, RequestHandler, NextFunction } from "express";

import { DeleteAccountUseCase } from "./DeleteAccountUseCase";

export class DeleteAccountController {
	constructor(
		private deleteAccountUseCase: DeleteAccountUseCase,
		private deleteAccountValidator: RequestHandler
	) {}

	validator(
		request: Request,
		response: Response,
		next: NextFunction
	): RequestHandler {
		return this.deleteAccountValidator(request, response, next);
	}

	async handle(request: Request, response: Response): Promise<Response> {
		try {
			const { id } = request.params;
			await this.deleteAccountUseCase.execute({ id });

			return response.status(200).send();
		} catch (error) {
			return response.status(error.status || 500).json({
				message: error.message || "Unexpected error.",
			});
		}
	}
}
