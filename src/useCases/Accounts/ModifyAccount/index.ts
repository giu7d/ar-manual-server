import { PGAccountRepository } from "src/repositories/Account/implementations/PGAccountRepository";

import { ModifyAccountController } from "./ModifyAccountController";
import { ModifyAccountUseCase } from "./ModifyAccountUseCase";
import { modifyAccountValidatorHandler } from "./ModifyAccountValidator";

const modifyAccountUseCase = new ModifyAccountUseCase(
	new PGAccountRepository()
);

export const modifyAccountController = new ModifyAccountController(
	modifyAccountUseCase,
	modifyAccountValidatorHandler
);
