import { PGAnalysisRepository } from "src/repositories/Analysis/implementation/PGAnalysisRepository";
import { PGTestBenchRepository } from "src/repositories/TestBench/implementations/PGTestBenchRepository";

import { IndexAnalysisController } from "./IndexAnalysisController";
import { IndexAnalysisUseCase } from "./IndexAnalysisUseCase";
import { indexAnalysisValidatorHandler } from "./IndexAnalysisValidator";

const indexAnalysisUseCase = new IndexAnalysisUseCase(
	new PGTestBenchRepository(),
	new PGAnalysisRepository()
);

export const indexAnalysisController = new IndexAnalysisController(
	indexAnalysisUseCase,
	indexAnalysisValidatorHandler
);
