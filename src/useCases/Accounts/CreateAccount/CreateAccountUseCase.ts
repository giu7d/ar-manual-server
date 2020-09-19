import { v4 as uuid } from "uuid";

import { Account } from "src/entities/Account/Account";
import { IAccountsRepositories } from "src/repositories/Account/IAccountsRepository";
import { hashPassword } from "src/utils";

import { ICreateAccountRequestDTO } from "./CreateAccountDTO";

export class CreateAccountUseCase {
	constructor(private accountsRepository: IAccountsRepositories) {}

	async execute(data: ICreateAccountRequestDTO) {
		const accountAlreadyExists = await this.accountsRepository.findByEmail(
			data.email
		);

		if (accountAlreadyExists) {
			throw new Error("This account already exists.");
		}

		const salt = uuid();
		const hashedPassword = hashPassword(data.password, salt);

		const account = new Account({
			...data,
			salt,
			password: hashedPassword,
		});

		await this.accountsRepository.save(account);
	}
}
