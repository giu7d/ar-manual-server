import { Response, Request, RequestHandler, NextFunction } from "express";

import { UploadBase64UseCase } from "./UploadBase64UseCase";

export class UploadBase64Controller {
	constructor(
		private useCase: UploadBase64UseCase,
		private validator: RequestHandler
	) {}

	validate(
		request: Request,
		response: Response,
		next: NextFunction
	): RequestHandler {
		return this.validator(request, response, next);
	}

	async handle(request: Request, response: Response): Promise<Response> {
		try {
			const message = await this.useCase.execute({
				folder: request.params.folder,
				files: request.body.files,
			});
			return response.status(200).json(message).send();
		} catch (error) {
			return response
				.status(error.status || 500)
				.json({ message: error.message || "Unexpected error!" })
				.send();
		}
	}
}
