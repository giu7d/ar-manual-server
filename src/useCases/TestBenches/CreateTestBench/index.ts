import { Controller } from "./CreateTestBenchController";
import { UseCase } from "./CreateTestBenchUseCase";
import { validatorHandler } from "./CreateTestBenchValidator";

const useCase = new UseCase();

export const controller = new Controller(useCase, validatorHandler);
