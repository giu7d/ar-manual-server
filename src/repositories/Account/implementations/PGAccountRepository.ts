import { getRepository, Repository } from "typeorm";

import { Account } from "src/entities/Account/Account";
import { AccountORM } from "src/entities/Account/AccountORM";

import { IAccountsRepositories } from "../IAccountsRepository";

export class PGAccountRepository implements IAccountsRepositories {
	private repository(): Repository<AccountORM> {
		return getRepository(AccountORM);
	}

	async save(account: Account) {
		await this.repository().save(account);
	}

	async modify(id: string, account: Partial<Omit<Account, "id" | "email">>) {
		await this.repository().update({ id }, account);
	}

	async delete(id: string) {
		await this.repository().delete({ id });
	}

	async findByEmail(email: string) {
		const account = await this.repository().findOne({ email });
		return account;
	}

	async findById(id: string) {
		const account = await this.repository().findOne({ id });
		return account;
	}
}
