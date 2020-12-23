/* eslint-disable max-classes-per-file */
export class TestBenchNotFound extends Error {
	public status: number;

	constructor() {
		super();
		this.status = 404;
		this.message =
			"Unable to find testbench! Verify if the informed testBench.id is correct!";
	}
}
