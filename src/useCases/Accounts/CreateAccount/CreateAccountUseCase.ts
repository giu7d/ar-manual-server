import { v4 as uuid } from "uuid";

import { Account } from "src/entities/Account/Account";
import { IAccountsRepository } from "src/repositories/Account/IAccountsRepository";
import { hashPassword } from "src/utils";

import { ICreateAccountRequestDTO } from "./CreateAccountDTO";

export class CreateAccountUseCase {
	constructor(private accountsRepository: IAccountsRepository) {}

	async execute(data: ICreateAccountRequestDTO) {
		const salt = uuid();
		const hashedPassword = hashPassword(data.password, salt);

		const account = new Account({
			...data,
			salt,
			password: hashedPassword,
		});

		await this.accountsRepository.save(account);

		return { id: account.id };
	}
}
