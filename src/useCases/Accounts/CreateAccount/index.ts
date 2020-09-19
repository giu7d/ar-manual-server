import { PGAccountRepository } from "src/repositories/Account/implementations/PGAccountRepository";

import { CreateAccountUseCase } from "./CreateAccountUseCase";
import { CreateAccountController } from "./CreateAccountController";
import { createAccountValidator } from "./CreateAccountValidator";

const accountRepository = new PGAccountRepository();

export const createAccountUseCase = new CreateAccountUseCase(accountRepository);

export const createAccountController = new CreateAccountController(
	createAccountUseCase,
	createAccountValidator
);
