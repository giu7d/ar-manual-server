import { PGAccountRepository } from "src/repositories/Account/implementations/PGAccountRepository";
import { PGAnalysisRepository } from "src/repositories/Analysis/implementation/PGAnalysisRepository";
import { PGTestBenchRepository } from "src/repositories/TestBench/implementations/PGTestBenchRepository";

import { CreateAnalysisController } from "./CreateAnalysisController";
import { CreateAnalysisUseCase } from "./CreateAnalysisUseCase";
import { createAnalysisValidatorHandler } from "./CreateAnalysisValidator";

const createAnalysisUseCase = new CreateAnalysisUseCase(
	new PGTestBenchRepository(),
	new PGAccountRepository(),
	new PGAnalysisRepository()
);

export const createAnalysisController = new CreateAnalysisController(
	createAnalysisUseCase,
	createAnalysisValidatorHandler
);
