import { Router } from "express";

import { createAccountController } from "src/useCases/Accounts/CreateAccount";
import { deleteAccountController } from "src/useCases/Accounts/DeleteAccount";

const routes = Router();

routes.post(
	"/accounts",
	(req, res, next) => createAccountController.validator(req, res, next),
	(req, res) => createAccountController.handle(req, res)
);

routes.delete(
	"/accounts/:id",
	(req, res, next) => deleteAccountController.validator(req, res, next),
	(req, res) => deleteAccountController.handle(req, res)
);

export { routes };
