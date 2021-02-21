import { IAccountsRepository } from "src/repositories/Account/IAccountsRepository";
import { ApplicationError } from "src/utils";

import { IPermissionServiceDTO } from "./PermissionServiceDTO";

export class PermissionService {
	constructor(private accountRepository: IAccountsRepository) {}

	async execute(data: IPermissionServiceDTO) {
		if (data.clientType === "ANALYSIS_MOBILE_APP") return true;

		const account = await this.accountRepository.findById(data.accountId);

		if (!account) throw new ApplicationError(404, "Account Not Found!");

		if (account.isAdmin && data.clientType === "MANAGEMENT_WEB_APP")
			return true;

		throw new ApplicationError(403, "Access Forbidden!");
	}
}
