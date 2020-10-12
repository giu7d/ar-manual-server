import { IAccountsRepositories } from "src/repositories/Account/IAccountsRepository";

import { IDeleteAccountRequestDTO } from "./DeleteAccountDTO";

export class DeleteAccountUseCase {
	constructor(private accountsRepository: IAccountsRepositories) {}

	async execute(data: IDeleteAccountRequestDTO) {
		const account = await this.accountsRepository.findById(data.id);
		await this.accountsRepository.delete(account.id);
	}
}
