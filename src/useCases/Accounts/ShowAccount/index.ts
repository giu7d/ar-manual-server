import { PGAccountRepository } from "src/repositories/Account/implementations/PGAccountRepository";

import { ShowAccountController } from "./ShowAccountController";
import { ShowAccountUseCase } from "./ShowAccountUseCase";
import { showAccountValidatorHandler } from "./ShowAccountValidator";

const showAccountUseCase = new ShowAccountUseCase(new PGAccountRepository());

export const showAccountController = new ShowAccountController(
	showAccountUseCase,
	showAccountValidatorHandler
);
