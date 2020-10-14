import { Account } from "src/entities/Account/Account";

export interface IAccountsRepository {
	save(account: Account): Promise<void>;

	modify(
		id: string,
		account: Partial<Omit<Account, "id" | "email">>,
		isActive?: boolean
	): Promise<void>;

	delete(id: string): Promise<void>;

	findByEmail(email: string, isActive?: boolean): Promise<Account>;

	findById(id: string, isActive?: boolean): Promise<Account>;
}
