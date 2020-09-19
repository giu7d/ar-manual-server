import { Router } from "express";

import { authenticationMiddleware } from "src/middleware/Authentication";
import { authenticateAccountController } from "src/useCases/Accounts/AuthenticateAccount";
import { createAccountController } from "src/useCases/Accounts/CreateAccount";
import { deleteAccountController } from "src/useCases/Accounts/DeleteAccount";

const routes = Router();

routes.post(
	"/accounts",
	(req, res, next) => createAccountController.validator(req, res, next),
	(req, res) => createAccountController.handle(req, res)
);

routes.post(
	"/accounts/auth",
	(req, res, next) => authenticateAccountController.validator(req, res, next),
	(req, res) => authenticateAccountController.handle(req, res)
);

routes.delete(
	"/accounts/:id",
	(req, res, next) => authenticationMiddleware.handle(req, res, next),
	(req, res, next) => deleteAccountController.validator(req, res, next),
	(req, res) => deleteAccountController.handle(req, res)
);

export { routes };
