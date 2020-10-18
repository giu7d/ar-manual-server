import crypto from "crypto";
import jwt from "jsonwebtoken";

import { Account } from "./entities/Account/Account";

const { JWT_SECRET } = process.env;

// Password
export function hashPassword(password: string, salt: string): string {
	const hashedPassword = crypto
		.createHmac("sha512", password + salt)
		.digest("hex");

	return hashedPassword;
}

export function extractBearer(token: string) {
	if (token.startsWith("Bearer ")) {
		return token.slice(7, token.length);
	}

	throw new ApplicationError(
		400,
		"Authentication token is not a Bearer token!"
	);
}

export function extractBearerTokenData(bearerToken: string) {
	const token = extractBearer(bearerToken);
	return jwt.verify(token, JWT_SECRET) as { data: Account };
}

// Error
export class ApplicationError extends Error {
	constructor(public status: number, public message: string) {
		super();
	}
}
