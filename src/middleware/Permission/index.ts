import { compose } from "compose-middleware";

import { PGAccountRepository } from "src/repositories/Account/implementations/PGAccountRepository";

import { PermissionLogic } from "./PermissionLogic";
import { PermissionMiddleware } from "./PermissionMiddleware";
import { permissionMiddlewareValidator } from "./PermissionMiddlewareValidation";

const logic = new PermissionLogic(new PGAccountRepository());

export const middleware = new PermissionMiddleware(logic);

export const permissionMiddleware = compose([
	permissionMiddlewareValidator,
	(req, res, next) => middleware.handle(req, res, next),
]);
