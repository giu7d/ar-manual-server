import { Controller } from "./ShowAccountController";
import { UseCase } from "./ShowAccountUseCase";
import { validatorHandler } from "./ShowAccountValidator";

const useCase = new UseCase();

export const controller = new Controller(useCase, validatorHandler);
