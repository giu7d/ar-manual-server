import { Response, Request, NextFunction } from "express";

import { PermissionLogic } from "./PermissionLogic";

export class PermissionMiddleware {
	constructor(private logic: PermissionLogic) {}

	async handle(request: Request, response: Response, next: NextFunction) {
		try {
			await this.logic.execute({
				accountId: request.headers["api-account-id"] as string,
				clientType: request.headers["Client-Type"] as string,
			});

			return next();
		} catch (error) {
			return response
				.status(error.status || 500)
				.json({ message: error.message || "Unexpected error!" });
		}
	}
}
