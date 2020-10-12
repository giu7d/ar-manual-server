import { Controller } from "./IndexTestBenchController";
import { UseCase } from "./IndexTestBenchUseCase";
import { validatorHandler } from "./IndexTestBenchValidator";

const useCase = new UseCase();

export const controller = new Controller(useCase, validatorHandler);
