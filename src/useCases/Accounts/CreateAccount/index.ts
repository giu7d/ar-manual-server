import { PGAccountRepository } from "src/repositories/Account/implementations/PGAccountRepository";

import { CreateAccountController } from "./CreateAccountController";
import { CreateAccountUseCase } from "./CreateAccountUseCase";
import { createAccountValidator } from "./CreateAccountValidator";

const accountRepository = new PGAccountRepository();

export const createAccountUseCase = new CreateAccountUseCase(accountRepository);

export const createAccountController = new CreateAccountController(
	createAccountUseCase,
	createAccountValidator
);
