/* eslint-disable max-classes-per-file */
export class FileUploadMalformedError extends Error {
	public status: number;

	constructor() {
		super();
		this.status = 400;
		this.message = "Files should not be empty!";
	}
}
