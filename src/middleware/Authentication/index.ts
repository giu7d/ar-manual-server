import { compose } from "compose-middleware";

import { AuthenticationService } from "../../services/Authentication/AuthenticationService";
import { AuthenticationMiddleware } from "./AuthenticationMiddleware";
import { authenticationMiddlewareValidator } from "./AuthenticationMiddlewareValidation";

const service = new AuthenticationService();

const middleware = new AuthenticationMiddleware(service);

export const authenticationMiddleware = compose([
	authenticationMiddlewareValidator,
	(req, res, next) => middleware.handle(req, res, next),
]);
