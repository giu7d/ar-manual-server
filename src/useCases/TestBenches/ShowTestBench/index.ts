import { Controller } from "./ShowTestBenchController";
import { UseCase } from "./ShowTestBenchUseCase";
import { validatorHandler } from "./ShowTestBenchValidator";

const useCase = new UseCase();

export const controller = new Controller(useCase, validatorHandler);
