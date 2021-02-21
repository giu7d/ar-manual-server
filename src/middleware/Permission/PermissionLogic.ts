import { IAccountsRepository } from "src/repositories/Account/IAccountsRepository";
import { ApplicationError } from "src/utils";

import { IPermissionLogicDTO } from "./PermissionLogicDTO";

export class PermissionLogic {
	constructor(private accountRepository: IAccountsRepository) {}

	async execute(data: IPermissionLogicDTO) {
		if (data.clientType === "ANALYSIS_MOBILE_APP") {
			return true;
		}

		const account = await this.accountRepository.findById(data.accountId);

		if (account.isAdmin && data.clientType === "MANAGEMENT_WEB_APP") {
			return true;
		}

		throw new ApplicationError(403, "Access Forbidden!");
	}
}
