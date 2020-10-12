import { Controller } from "./ModifyAccountController";
import { UseCase } from "./ModifyAccountUseCase";
import { validatorHandler } from "./ModifyAccountValidator";

const useCase = new UseCase();

export const controller = new Controller(useCase, validatorHandler);
