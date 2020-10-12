import { Router } from "express";

import { authenticationMiddleware } from "src/middleware/Authentication";
import { authenticateAccountController } from "src/useCases/Accounts/AuthenticateAccount";
import { createAccountController } from "src/useCases/Accounts/CreateAccount";
import { deleteAccountController } from "src/useCases/Accounts/DeleteAccount";
import { modifyAccountController } from "src/useCases/Accounts/ModifyAccount";
import { showAccountController } from "src/useCases/Accounts/ShowAccount";

const routes = Router();

// Accounts
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
	"/accounts/:accountId",
	(req, res, next) => authenticationMiddleware.handle(req, res, next),
	(req, res, next) => deleteAccountController.validator(req, res, next),
	(req, res) => deleteAccountController.handle(req, res)
);

routes.get(
	"/accounts/:accountId",
	(req, res, next) => authenticationMiddleware.handle(req, res, next),
	(req, res, next) => showAccountController.validator(req, res, next),
	(req, res) => showAccountController.handle(req, res)
);

routes.put(
	"/accounts/:accountId",
	(req, res, next) => authenticationMiddleware.handle(req, res, next),
	(req, res, next) => modifyAccountController.validator(req, res, next),
	(req, res) => modifyAccountController.handle(req, res)
);

// Test Benches

// Analysis

export { routes };
