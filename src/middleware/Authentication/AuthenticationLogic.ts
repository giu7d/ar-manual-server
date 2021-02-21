import jwt from "jsonwebtoken";

import { Account } from "src/entities/Account/Account";
import { ApplicationError, extractBearer } from "src/utils";

import { IAuthenticationLogicDTO } from "./AuthenticationLogicDTO";

const { JWT_SECRET } = process.env;

export class AuthenticationLogic {
	async execute(data: IAuthenticationLogicDTO) {
		if (!data.bearerToken) {
			throw new ApplicationError(
				400,
				"Authorization token not found in the request header!"
			);
		}

		const token = extractBearer(data.bearerToken);

		return jwt.verify(token, JWT_SECRET) as { data: Account };
	}
}
