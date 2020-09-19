import { Response, Request, NextFunction } from "express";

import { AuthenticationService } from "./AuthenticationService";

export class AuthenticationMiddleware {
	constructor(private authenticationService: AuthenticationService) {}

	async handle(request: Request, response: Response, next: NextFunction) {
		try {
			const { authorization } = request.headers;

			await this.authenticationService.execute(authorization);

			return next();
		} catch (error) {
			return response
				.status(500)
				.json({ message: error.message || "Unexpected error!" })
				.send();
		}
	}
}
