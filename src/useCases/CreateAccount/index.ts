import { MailtrapMailProvider } from "../../providers/implementations/MailtrapMailProvider";
import { PostgressAccountRepository } from "../../repositories/implementations/PostgresAccountRepository";
import { CreateAccountUseCase } from "./CreateAccountUseCase";
import { CreateAccountController } from "./CreateAccountController";

const mailtrapMailProvider = new MailtrapMailProvider();
const postgressAccountRepository = new PostgressAccountRepository();

export const createAccountUseCase = new CreateAccountUseCase(
  postgressAccountRepository,
  mailtrapMailProvider
);

export const createAccountController = new CreateAccountController(
  createAccountUseCase
);
