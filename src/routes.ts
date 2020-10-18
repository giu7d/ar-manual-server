import { Router } from "express";

import { authenticationMiddleware } from "src/middleware/Authentication";
import { authenticateAccountController } from "src/useCases/Accounts/AuthenticateAccount";
import { createAccountController } from "src/useCases/Accounts/CreateAccount";
import { deleteAccountController } from "src/useCases/Accounts/DeleteAccount";
import { modifyAccountController } from "src/useCases/Accounts/ModifyAccount";
import { showAccountController } from "src/useCases/Accounts/ShowAccount";
import { createAnalysisController } from "src/useCases/Analysis/CreateAnalysis";
import { createInstructionController } from "src/useCases/Instructions/CreateInstruction";
import { modifyInstructionController } from "src/useCases/Instructions/ModifyInstruction";
import { createTestBenchController } from "src/useCases/TestBenches/CreateTestBench";
import { deleteTestBenchController } from "src/useCases/TestBenches/DeleteTestBench";
import { indexTestBenchController } from "src/useCases/TestBenches/IndexTestBench";
import { modifyTestBenchController } from "src/useCases/TestBenches/ModifyTestBench";
import { showTestBenchController } from "src/useCases/TestBenches/ShowTestBench";

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
routes.post(
	"/testbenches",
	(req, res, next) => authenticationMiddleware.handle(req, res, next),
	(req, res, next) => createTestBenchController.validator(req, res, next),
	(req, res) => createTestBenchController.handle(req, res)
);

routes.get(
	"/testbenches",
	(req, res, next) => authenticationMiddleware.handle(req, res, next),
	(req, res, next) => indexTestBenchController.validator(req, res, next),
	(req, res) => indexTestBenchController.handle(req, res)
);

routes.get(
	"/testbenches/:testBenchId",
	(req, res, next) => authenticationMiddleware.handle(req, res, next),
	(req, res, next) => showTestBenchController.validator(req, res, next),
	(req, res) => showTestBenchController.handle(req, res)
);

routes.put(
	"/testbenches/:testBenchId",
	(req, res, next) => authenticationMiddleware.handle(req, res, next),
	(req, res, next) => modifyTestBenchController.validator(req, res, next),
	(req, res) => modifyTestBenchController.handle(req, res)
);

routes.delete(
	"/testbenches/:testBenchId",
	(req, res, next) => authenticationMiddleware.handle(req, res, next),
	(req, res, next) => deleteTestBenchController.validator(req, res, next),
	(req, res) => deleteTestBenchController.handle(req, res)
);

// Test Benches Instructions
routes.post(
	"/testbenches/:testBenchId/instructions",
	(req, res, next) => authenticationMiddleware.handle(req, res, next),
	(req, res, next) => createInstructionController.validator(req, res, next),
	(req, res) => createInstructionController.handle(req, res)
);

routes.put(
	"/testbenches/:testBenchId/instructions/:instructionId",
	(req, res, next) => authenticationMiddleware.handle(req, res, next),
	(req, res, next) => modifyInstructionController.validator(req, res, next),
	(req, res) => modifyInstructionController.handle(req, res)
);

// Analysis
routes.post(
	"/analysis",
	(req, res, next) => authenticationMiddleware.handle(req, res, next),
	(req, res, next) => createAnalysisController.validator(req, res, next),
	(req, res) => createAnalysisController.handle(req, res)
);

export { routes };
