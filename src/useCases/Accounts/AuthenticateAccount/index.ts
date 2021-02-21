import { PGAccountRepository } from "src/repositories/Account/implementations/PGAccountRepository";
import { PermissionService } from "src/services/Permission/PermissionService";

import { AuthenticateAccountController } from "./AuthenticateAccountController";
import { AuthenticateAccountUseCase } from "./AuthenticateAccountUseCase";
import { authenticateAccountValidator } from "./AuthenticateAccountValidator";

const accountRepository = new PGAccountRepository();

export const authenticateAccountUseCase = new AuthenticateAccountUseCase(
	accountRepository
);

export const permissionService = new PermissionService(accountRepository);

export const authenticateAccountController = new AuthenticateAccountController(
	authenticateAccountUseCase,
	authenticateAccountValidator,
	permissionService
);
