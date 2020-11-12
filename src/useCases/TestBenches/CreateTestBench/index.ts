import { GoogleFileStorageProvider } from "src/providers/FileStorage/implementation/GoogleFileStorageProvider";
import { PGTestBenchRepository } from "src/repositories/TestBench/implementations/PGTestBenchRepository";

import { CreateTestBenchController } from "./CreateTestBenchController";
import { CreateTestBenchUseCase } from "./CreateTestBenchUseCase";
import { createTestBenchValidatorHandler } from "./CreateTestBenchValidator";

const FOLDER_NAME = "qrcodes";

const createTestBenchUseCase = new CreateTestBenchUseCase(
	new PGTestBenchRepository(),
	new GoogleFileStorageProvider(FOLDER_NAME)
);

export const createTestBenchController = new CreateTestBenchController(
	createTestBenchUseCase,
	createTestBenchValidatorHandler
);
