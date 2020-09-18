import { Account } from "../../entities/Account";
import { IAccountsRepositories } from "../IAccountsRepository";

export class PostgressAccountRepository implements IAccountsRepositories {
  private accounts: Account[] = [];

  async findByEmail(email: string): Promise<Account> {
    return this.accounts.find((account) => account.email === email);
  }

  async save(account: Account): Promise<void> {
    this.accounts.push(account);
  }
}
