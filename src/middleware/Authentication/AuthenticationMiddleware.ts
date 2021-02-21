import { Response, Request, NextFunction } from "express";

import { AuthenticationLogic } from "./AuthenticationLogic";

export class AuthenticationMiddleware {
	constructor(private logic: AuthenticationLogic) {}

	async handle(request: Request, response: Response, next: NextFunction) {
		try {
			const { authorization } = request.headers;

			const response = await this.logic.execute({ bearerToken: authorization });

			request.headers["api-account-id"] = response.data.id;

			return next();
		} catch (error) {
			return response
				.status(error.status || 500)
				.json({ message: error.message || "Unexpected error!" });
		}
	}
}
