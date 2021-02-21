import jwt from "jsonwebtoken";

import { IAccountsRepository } from "src/repositories/Account/IAccountsRepository";
import { ApplicationError, extractBearer } from "src/utils";

import { IPermissionLogicDTO } from "./PermissionLogicDTO";

const { JWT_SECRET } = process.env;

export class PermissionLogic {
	constructor(private accountRepository: IAccountsRepository) {}

	async execute(data: IPermissionLogicDTO) {
		if (data.clientType === "ANALYSIS_MOBILE_APP") return true;

		const account = await this.getAccountFromBearerToken(data.bearerToken);

		if (!account) throw new ApplicationError(404, "Account Not Found!");

		if (account.isAdmin && data.clientType === "MANAGEMENT_WEB_APP")
			return true;

		throw new ApplicationError(403, "Access Forbidden!");
	}

	private async getAccountFromBearerToken(bearerToken: string) {
		const token = extractBearer(bearerToken);
		const tokenPayload = jwt.verify(token, JWT_SECRET) as { data: Account };

		const account = await this.accountRepository.findById(tokenPayload.data.id);

		return account;
	}
}
