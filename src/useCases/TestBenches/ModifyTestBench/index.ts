import { PGTestBenchRepository } from "src/repositories/TestBench/implementations/PGTestBenchRepository";

import { ModifyTestBenchController } from "./ModifyTestBenchController";
import { ModifyTestBenchUseCase } from "./ModifyTestBenchUseCase";
import { modifyTestBenchValidatorHandler } from "./ModifyTestBenchValidator";

const modifyTestBenchUseCase = new ModifyTestBenchUseCase(
	new PGTestBenchRepository()
);

export const modifyTestBenchController = new ModifyTestBenchController(
	modifyTestBenchUseCase,
	modifyTestBenchValidatorHandler
);
