import { Response, Request, NextFunction } from "express";

import { PermissionService } from "src/services/Permission/PermissionService";

export class PermissionMiddleware {
	constructor(private service: PermissionService) {}

	async handle(request: Request, response: Response, next: NextFunction) {
		try {
			await this.service.execute({
				accountId: request.headers["api-account-id"] as string,
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
