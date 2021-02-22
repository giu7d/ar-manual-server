import jwt from "jsonwebtoken";

import { IAccountsRepository } from "src/repositories/Account/IAccountsRepository";
import { ApplicationError, hashPassword } from "src/utils";

import { IAuthenticateAccountRequestDTO } from "./AuthenticateAccountDTO";

const { JWT_SECRET } = process.env;

export class AuthenticateAccountUseCase {
	constructor(private accountsRepository: IAccountsRepository) {}

	async execute(data: IAuthenticateAccountRequestDTO) {
		const account = await this.accountsRepository.findByEmail(data.email);

		const hashedPassword = hashPassword(data.password, account.salt);

		if (account.password !== hashedPassword) {
			throw new ApplicationError(403, "Password is incorrect!");
		}

		const jwtPayload = {
			...account,
			password: undefined,
			salt: undefined,
		};

		const token = jwt.sign({ data: jwtPayload }, JWT_SECRET, {
			expiresIn: "5h",
		});

		return { token, accountId: account.id };
	}
}
