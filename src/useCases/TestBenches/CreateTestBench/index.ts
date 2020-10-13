import { PGTestBenchRepository } from "src/repositories/TestBench/implementations/PGTestBenchRepository";

import { CreateTestBenchController } from "./CreateTestBenchController";
import { CreateTestBenchUseCase } from "./CreateTestBenchUseCase";
import { createTestBenchValidatorHandler } from "./CreateTestBenchValidator";

const createTestBenchUseCase = new CreateTestBenchUseCase(
	new PGTestBenchRepository()
);

export const createTestBenchController = new CreateTestBenchController(
	createTestBenchUseCase,
	createTestBenchValidatorHandler
);
