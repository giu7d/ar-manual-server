import { IAccountsRepositories } from "src/repositories/Account/IAccountsRepository";

import { IDeleteAccountRequestDTO } from "./DeleteAccountDTO";

export class DeleteAccountUseCase {
	constructor(private accountsRepository: IAccountsRepositories) {}

	async execute(data: IDeleteAccountRequestDTO) {
		await this.accountsRepository.delete(data.id);
	}
}
