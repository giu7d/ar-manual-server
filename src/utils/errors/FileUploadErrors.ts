/* eslint-disable max-classes-per-file */
export class FileUploadMalformedError extends Error {
	public status: number;

	constructor() {
		super();
		this.status = 400;
		this.message = "Files should not be empty!";
	}
}

export class FileUploadFormatError extends Error {
	public status: number;

	constructor(format: string) {
		super();
		this.status = 400;
		this.message = `The ${format} file format is not allowed! The valid file formats are: images (.png, .jpg); models (.glb).`;
	}
}
