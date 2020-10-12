import { Account } from "src/entities/Account/Account";

export interface DTO {
	id: string;
	firstName: string;
	lastName: string;
	newPassword: string;
	oldPassword: string;
}
