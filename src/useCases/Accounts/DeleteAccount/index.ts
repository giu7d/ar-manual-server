import { PGAccountRepository } from "src/repositories/Account/implementations/PGAccountRepository";

import { DeleteAccountController } from "./DeleteAccountController";
import { DeleteAccountUseCase } from "./DeleteAccountUseCase";
import { deleteAccountValidator } from "./DeleteAccountValidator";

const accountRepository = new PGAccountRepository();

export const deleteAccountUseCase = new DeleteAccountUseCase(accountRepository);

export const deleteAccountController = new DeleteAccountController(
	deleteAccountUseCase,
	deleteAccountValidator
);
