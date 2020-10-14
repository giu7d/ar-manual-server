import crypto from "crypto";

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

// Error
export class ApplicationError extends Error {
	constructor(public status: number, public message: string) {
		super();
	}
}
