import { Controller } from "./DeleteTestBenchController";
import { UseCase } from "./DeleteTestBenchUseCase";
import { validatorHandler } from "./DeleteTestBenchValidator";

const useCase = new UseCase();

export const controller = new Controller(useCase, validatorHandler);
