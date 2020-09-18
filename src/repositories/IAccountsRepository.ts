import { Account } from "../entities/Account";

export interface IAccountsRepositories {
  findByEmail(email: string): Promise<Account>;
  save(user: Account): Promise<void>;
}
