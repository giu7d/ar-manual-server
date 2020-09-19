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

	throw new Error(
		"Seens that your authentication token is not a Bearer token!"
	);
}
