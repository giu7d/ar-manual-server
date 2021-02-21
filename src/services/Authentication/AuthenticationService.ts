import jwt from "jsonwebtoken";

import { Account } from "src/entities/Account/Account";
import { ApplicationError, extractBearer } from "src/utils";

import { IAuthenticationServiceDTO } from "./AuthenticationServiceDTO";

const { JWT_SECRET } = process.env;

export class AuthenticationService {
	async execute(data: IAuthenticationServiceDTO) {
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
