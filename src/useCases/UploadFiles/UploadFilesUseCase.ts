import { UploadedFile } from "express-fileupload";
import { isEmpty } from "lodash";
import { v4 as uuid } from "uuid";

import { IFileStorageProvider } from "src/providers/FileStorage/IFileStorageProvider";
import { FileUploadMalformedError } from "src/utils/errors/FileUploadErrors";

export class UploadFilesUseCase {
	constructor(private fileStorageProvider: IFileStorageProvider) {}

	async execute(uploadedFiles: Array<UploadedFile> | UploadedFile) {
		const files =
			uploadedFiles instanceof Array ? uploadedFiles : [uploadedFiles];

		if (isEmpty(files)) {
			throw new FileUploadMalformedError();
		}

		const filesWithBinary = files.map(({ data, name, mimetype }) => ({
			name,
			mimetype,
			binary: Uint8Array.from(data),
		}));

		const filesWithBlobsURL = await Promise.all(
			filesWithBinary.map(async ({ binary, name, mimetype }) => {
				const newName = `${uuid()}.jpg`;

				return {
					oldName: name,
					newName,
					type: mimetype,
					url: await this.fileStorageProvider.save(newName, binary),
				};
			})
		);

		return filesWithBlobsURL;
	}
}
