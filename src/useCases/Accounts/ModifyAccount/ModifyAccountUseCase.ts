import { omit } from "lodash";
import { v4 as uuid } from "uuid";

import { Account } from "src/entities/Account/Account";
import { IAccountsRepositories } from "src/repositories/Account/IAccountsRepository";
import { ApplicationError, hashPassword } from "src/utils";

import { IModifyAccountRequestDTO } from "./ModifyAccountDTO";

export class ModifyAccountUseCase {
	constructor(private accountRepository: IAccountsRepositories) {}

	async execute(data: IModifyAccountRequestDTO) {
		const account: Partial<Account> = {
			...omit(data, "id", "newPassword", "oldPassword"),
		};

		const existentAccount = await this.accountRepository.findById(data.id);

		const accountWithPassword = this.modifyPassword(
			data.oldPassword,
			data.newPassword,
			existentAccount
		);

		Object.assign(account, accountWithPassword);

		await this.accountRepository.modify(existentAccount.id, account);
	}

	private modifyPassword(
		oldPassword: string,
		newPassword: string,
		existentAccount: Account
	) {
		if (newPassword && oldPassword) {
			const hashedOldPassword = hashPassword(oldPassword, existentAccount.salt);

			if (hashedOldPassword !== existentAccount.password) {
				throw new ApplicationError(409, "The password is incorrect!");
			}

			const salt = uuid();
			const password = hashPassword(newPassword, salt);

			return { salt, password };
		}

		if ((!newPassword && oldPassword) || (newPassword && !oldPassword)) {
			throw new ApplicationError(
				400,
				"To modify the password you should pass the old password and the new password into the request body!"
			);
		}

		return {};
	}
}
