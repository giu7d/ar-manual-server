import { Response, Request, RequestHandler, NextFunction } from "express";

import { PermissionService } from "src/services/Permission/PermissionService";

import { AuthenticateAccountUseCase } from "./AuthenticateAccountUseCase";

export class AuthenticateAccountController {
	constructor(
		private authenticateAccountUseCase: AuthenticateAccountUseCase,
		private authenticateAccountValidator: RequestHandler,
		private permissionService: PermissionService
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

			const {
				accountId,
				token,
			} = await this.authenticateAccountUseCase.execute(data);

			await this.permissionService.execute({
				accountId,
				clientType: request.headers["client-type"] as string,
			});

			return response.status(200).json({ token });
		} catch (error) {
			return response.status(error.status || 500).json({
				message: error.message || "Unexpected error!",
			});
		}
	}
}
