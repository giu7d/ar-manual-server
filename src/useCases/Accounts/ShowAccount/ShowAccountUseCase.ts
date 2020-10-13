import { IAccountsRepository } from "src/repositories/Account/IAccountsRepository";

import { IShowAccountRequestDTO } from "./ShowAccountDTO";

export class ShowAccountUseCase {
	constructor(private accountsRepository: IAccountsRepository) {}

	async execute(data: IShowAccountRequestDTO) {
		const account = await this.accountsRepository.findById(data.id);
		return account;
	}
}
