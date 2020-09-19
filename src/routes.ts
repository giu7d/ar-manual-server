import { Router } from "express";

import { createAccountController } from "src/useCases/Accounts/CreateAccount";

const routes = Router();

routes.post(
	"/accounts",
	(req, res, next) => createAccountController.validator(req, res, next),
	(req, res) => {
		return createAccountController.handle(req, res);
	}
);

export { routes };
