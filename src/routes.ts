import { Router } from "express";

import { createAccountController } from "./useCases/Accounts/CreateAccount";

const routes = Router();

routes.post("/accounts", (request, response) => {
	return createAccountController.handle(request, response);
});

export { routes };
