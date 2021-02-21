import { v4 } from "uuid";

export const generateCreateAccountRequest = (isAdmin = true) => ({
	firstName: "FirstName",
	lastName: "LastName",
	email: `${v4()}@test.com`,
	password: v4(),
	isAdmin,
});

export const generateAccount = (
	id = null,
	bearerToken = null,
	isAdmin = true
) => ({
	id,
	bearerToken,
	firstName: "FirstName",
	lastName: "LastName",
	email: `${v4()}@test.com`,
	password: v4(),
	isAdmin,
});
