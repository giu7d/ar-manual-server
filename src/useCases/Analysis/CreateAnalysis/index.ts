import { PGTestBenchRepository } from "src/repositories/TestBench/implementations/PGTestBenchRepository";

import { CreateAnalysisController } from "./CreateAnalysisController";
import { CreateAnalysisUseCase } from "./CreateAnalysisUseCase";
import { createAnalysisValidatorHandler } from "./CreateAnalysisValidator";

const createAnalysisUseCase = new CreateAnalysisUseCase(
	new PGTestBenchRepository()
);

export const createAnalysisController = new CreateAnalysisController(
	createAnalysisUseCase,
	createAnalysisValidatorHandler
);
