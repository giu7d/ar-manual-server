import { getRepository, Repository } from "typeorm";

import { Account } from "src/entities/Account/Account";
import { AccountORM } from "src/entities/Account/AccountORM";
import { ApplicationError } from "src/utils";

import { IAccountsRepository } from "../IAccountsRepository";

export class PGAccountRepository implements IAccountsRepository {
	private repository(): Repository<AccountORM> {
		return getRepository(AccountORM);
	}

	async save(account: Account) {
		if (!account) {
			throw new ApplicationError(400, "Account needs to be passed!");
		}

		await this.repository().save(account);
	}

	async modify(
		id: string,
		account: Partial<Omit<Account, "id" | "email">>,
		isActive = true
	) {
		if (!id) {
			throw new ApplicationError(400, "Id needs to be passed!");
		}

		if (!account) {
			throw new ApplicationError(400, "Account needs to be passed!");
		}

		await this.repository().update({ id, isActive }, account);
	}

	async delete(id: string) {
		if (!id) {
			throw new ApplicationError(400, "Id needs to be passed!");
		}

		await this.repository().update({ id, isActive: true }, { isActive: false });
	}

	async findByEmail(email: string, isActive = true) {
		const account = await this.repository().findOne({ email, isActive });

		if (!account) {
			throw new ApplicationError(404, "This account don't exist!");
		}

		return account;
	}

	async findById(id: string, isActive = true) {
		const account = await this.repository().findOne({ id, isActive });

		if (!account) {
			throw new ApplicationError(404, "This account don't exist!");
		}

		return account;
	}
}
