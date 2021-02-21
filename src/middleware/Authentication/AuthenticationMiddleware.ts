import { Response, Request, NextFunction } from "express";

import { AuthenticationService } from "../../services/Authentication/AuthenticationService";

export class AuthenticationMiddleware {
	constructor(private service: AuthenticationService) {}

	async handle(request: Request, response: Response, next: NextFunction) {
		try {
			const { authorization } = request.headers;

			const response = await this.service.execute({
				bearerToken: authorization,
			});

			request.headers["api-account-id"] = response.data.id;

			return next();
		} catch (error) {
			return response
				.status(error.status || 500)
				.json({ message: error.message || "Unexpected error!" });
		}
	}
}
