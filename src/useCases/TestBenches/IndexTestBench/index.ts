import { PGTestBenchRepository } from "src/repositories/TestBench/implementations/PGTestBenchRepository";

import { IndexTestBenchController } from "./IndexTestBenchController";
import { IndexTestBenchUseCase } from "./IndexTestBenchUseCase";
import { indexTestBenchValidatorHandler } from "./IndexTestBenchValidator";

const indexTestBenchUseCase = new IndexTestBenchUseCase(
	new PGTestBenchRepository()
);

export const indexTestBenchController = new IndexTestBenchController(
	indexTestBenchUseCase,
	indexTestBenchValidatorHandler
);
