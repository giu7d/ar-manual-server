import { compose } from "compose-middleware";

import { AuthenticationLogic } from "./AuthenticationLogic";
import { AuthenticationMiddleware } from "./AuthenticationMiddleware";
import { authenticationMiddlewareValidator } from "./AuthenticationMiddlewareValidation";

const logic = new AuthenticationLogic();

const middleware = new AuthenticationMiddleware(logic);

export const authenticationMiddleware = compose([
	authenticationMiddlewareValidator,
	(req, res, next) => middleware.handle(req, res, next),
]);
