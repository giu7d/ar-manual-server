import { Response, Request, RequestHandler, NextFunction } from "express";

import { UploadFilesUseCase } from "./UploadFilesUseCase";

export class UploadFilesController {
	constructor(
		private useCase: UploadFilesUseCase,
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
			const message = await this.useCase.execute(request.files.files);
			return response.status(200).json(message).send();
		} catch (error) {
			return response
				.status(error.status || 500)
				.json({ message: error.message || "Unexpected error!" })
				.send();
		}
	}
}
