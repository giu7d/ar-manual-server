import { compose } from "compose-middleware";

import { PGAccountRepository } from "src/repositories/Account/implementations/PGAccountRepository";
import { PermissionService } from "src/services/Permission/PermissionService";

import { PermissionMiddleware } from "./PermissionMiddleware";
import { permissionMiddlewareValidator } from "./PermissionMiddlewareValidation";

const service = new PermissionService(new PGAccountRepository());

export const middleware = new PermissionMiddleware(service);

export const permissionMiddleware = compose([
	permissionMiddlewareValidator,
	(req, res, next) => middleware.handle(req, res, next),
]);
