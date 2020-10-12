import { Account } from "src/entities/Account/Account";
import { IAccountsRepositories } from "src/repositories/Account/IAccountsRepository";
import { DTO } from "./ModifyAccountDTO";

export class UseCase {
	constructor(private accountRepository: IAccountsRepositories) {}

	async execute(data: DTO) {
		const account = await this.accountRepository.findById(data.id);

		this.accountRepository.modify(data.id, {
			...account,
		});

		return data;
	}
}
