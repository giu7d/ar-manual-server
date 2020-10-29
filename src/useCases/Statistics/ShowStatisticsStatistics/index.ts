import { PGAnalysisRepository } from "src/repositories/Analysis/implementation/PGAnalysisRepository";
import { PGAnalysisStepRepository } from "src/repositories/AnalysisStep/implementation/PGAnalysisStepRepository";
import { PGTestBenchRepository } from "src/repositories/TestBench/implementations/PGTestBenchRepository";

import { ShowStatisticsController } from "./ShowStatisticsController";
import { ShowStatisticsUseCase } from "./ShowStatisticsUseCase";
import { showStatisticsValidatorHandler } from "./ShowStatisticsValidator";

const showStatisticsUseCase = new ShowStatisticsUseCase(
	new PGTestBenchRepository(),
	new PGAnalysisRepository(),
	new PGAnalysisStepRepository()
);

export const showStatisticsController = new ShowStatisticsController(
	showStatisticsUseCase,
	showStatisticsValidatorHandler
);
