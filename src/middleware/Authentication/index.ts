import { AuthenticationMiddleware } from "./AuthenticationMiddleware";
import { AuthenticationService } from "./AuthenticationService";

const authenticationService = new AuthenticationService();

export const authenticationMiddleware = new AuthenticationMiddleware(
	authenticationService
);
