import { PGTestBenchRepository } from "src/repositories/TestBench/implementations/PGTestBenchRepository";

import { DeleteTestBenchController } from "./DeleteTestBenchController";
import { DeleteTestBenchUseCase } from "./DeleteTestBenchUseCase";
import { deleteTestBenchValidatorHandler } from "./DeleteTestBenchValidator";

const deleteTestBenchUseCase = new DeleteTestBenchUseCase(
	new PGTestBenchRepository()
);

export const deleteTestBenchController = new DeleteTestBenchController(
	deleteTestBenchUseCase,
	deleteTestBenchValidatorHandler
);
