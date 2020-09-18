import { Router } from "express";
import { createAccountController } from "./useCases/CreateAccount";

const router = Router();

router.post("/accounts", (request, response) => {
  return createAccountController.handle(request, response);
});

export { router };
