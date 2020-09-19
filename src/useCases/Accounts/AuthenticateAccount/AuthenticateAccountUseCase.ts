import jwt from "jsonwebtoken";

import { IAccountsRepositories } from "src/repositories/Account/IAccountsRepository";
import { hashPassword } from "src/utils";

import { IAuthenticateAccountRequestDTO } from "./AuthenticateAccountDTO";

const { JWT_SECRET } = process.env;

export class AuthenticateAccountUseCase {
	constructor(private accountsRepository: IAccountsRepositories) {}

	async execute(data: IAuthenticateAccountRequestDTO) {
		const account = await this.accountsRepository.findByEmail(data.email);

		if (!account) {
			throw new Error("The user don't exist, check if the email is correct!");
		}

		const hashedPassword = hashPassword(data.password, account.salt);

		if (account.password !== hashedPassword) {
			throw new Error("The password is incorrect!");
		}

		const jwtPayload = {
			...account,
			password: undefined,
			salt: undefined,
		};

		const token = jwt.sign({ data: jwtPayload }, JWT_SECRET, {
			expiresIn: "5h",
		});

		return { token };
	}
}
