import { IAccountsRepositories } from "../../../repositories/IAccountsRepository";
import { IMailProvider } from "../../../providers/IMailProvider";
import { Account } from "../../../entities/Account";
import { ICreateAccountRequestDTO } from "./CreateAccountDTO";

export class CreateAccountUseCase {
	constructor(
		private accountsRepository: IAccountsRepositories,
		private mailProvider: IMailProvider
	) {}

	async execute(data: ICreateAccountRequestDTO) {
		const accountAlreadyExists = await this.accountsRepository.findByEmail(
			data.email
		);

		if (accountAlreadyExists) {
			throw new Error("User already exists.");
		}

		const account = new Account(data);

		await this.accountsRepository.save(account);

		await this.mailProvider.sendMail({
			to: {
				name: data.name,
				email: data.email,
			},
			from: {
				name: "data.name",
				email: "data.email",
			},
			subject: "",
			body: "<p>Hello World</p>",
		});
	}
}
