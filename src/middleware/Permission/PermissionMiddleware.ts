import { Response, Request, NextFunction } from "express";

import { PermissionLogic } from "./PermissionLogic";

export class PermissionMiddleware {
	constructor(private logic: PermissionLogic) {}

	async handle(request: Request, response: Response, next: NextFunction) {
		try {
			const { authorization } = request.headers;

			await this.logic.execute({
				bearerToken: authorization,
				clientType: request.headers["client-type"] as string,
			});

			return next();
		} catch (error) {
			return response
				.status(error.status || 500)
				.json({ message: error.message || "Unexpected error!" });
		}
	}
}
