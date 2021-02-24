import { UploadedFile } from "express-fileupload";
import { isEmpty } from "lodash";
import { v4 as uuid } from "uuid";

import { IFileStorageProvider } from "src/providers/FileStorage/IFileStorageProvider";
import {
	FileUploadFormatError,
	FileUploadMalformedError,
} from "src/utils/errors/FileUploadErrors";

export class UploadFormDataUseCase {
	constructor(private fileStorageProvider: IFileStorageProvider) {}

	async execute(
		folder: string,
		uploadedFiles: Array<UploadedFile> | UploadedFile
	) {
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
				const [oldName, format] = name.split(".");
				const [type] = mimetype.split("/");

				if (!format.toLowerCase().match(/jpg|jpeg|png|glb/)) {
					throw new FileUploadFormatError(format);
				}

				let fileName;

				if (type === "image") {
					fileName = `${folder}/${uuid()}.jpg`;
				} else {
					fileName = `${folder}/${uuid()}.${format}`;
				}

				const url = await this.fileStorageProvider.save(fileName, binary);

				return {
					type,
					url,
					oldName,
					newName: fileName,
				};
			})
		);

		return filesWithBlobsURL;
	}
}
