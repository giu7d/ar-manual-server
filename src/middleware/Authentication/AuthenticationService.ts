import jwt from "jsonwebtoken";

import { Account } from "src/entities/Account/Account";
import { extractBearer } from "src/utils";

const { JWT_SECRET } = process.env;

export class AuthenticationService {
	async execute(bearerToken: string) {
		if (!bearerToken) {
			throw new Error("Authorization token not found in the request header!");
		}

		const token = extractBearer(bearerToken);

		return jwt.verify(token, JWT_SECRET) as { data: Account };
	}
}
