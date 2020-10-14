import { PGTestBenchRepository } from "src/repositories/TestBench/implementations/PGTestBenchRepository";

import { ShowTestBenchController } from "./ShowTestBenchController";
import { ShowTestBenchUseCase } from "./ShowTestBenchUseCase";
import { showTestBenchValidatorHandler } from "./ShowTestBenchValidator";

const showTestBenchUseCase = new ShowTestBenchUseCase(
	new PGTestBenchRepository()
);

export const showTestBenchController = new ShowTestBenchController(
	showTestBenchUseCase,
	showTestBenchValidatorHandler
);
