import FileType from "file-type";
import { isEmpty } from "lodash";
import { v4 as uuid } from "uuid";

import { IFileStorageProvider } from "src/providers/FileStorage/IFileStorageProvider";
import {
	FileUploadFormatError,
	FileUploadMalformedError,
} from "src/utils/errors/FileUploadErrors";

import { UploadBase64DTO } from "./UploadBase64DTO";

export class UploadBase64UseCase {
	constructor(private fileStorageProvider: IFileStorageProvider) {}

	async execute(data: UploadBase64DTO) {
		if (isEmpty(data.files)) {
			throw new FileUploadMalformedError();
		}

		const filesWithBinary = await Promise.all(
			data.files.map(async (file) => {
				const buffer = Buffer.from(file, "base64");

				const { mime } = await FileType.fromBuffer(buffer);

				return {
					mimetype: mime,
					binary: Uint8Array.from(buffer),
				};
			})
		);

		const filesWithBlobsURL = await Promise.all(
			filesWithBinary.map(async ({ binary, mimetype }) => {
				const [type, format] = mimetype.split("/");

				if (!format.match(/jpg|jpeg|png|gltf-binary/)) {
					throw new FileUploadFormatError(format);
				}

				let fileName;

				if (type === "image") {
					fileName = `${data.folder}/${uuid()}.jpg`;
				} else {
					fileName = `${data.folder}/${uuid()}.glb`;
				}

				const url = await this.fileStorageProvider.save(fileName, binary);

				return {
					type,
					url,
					newName: fileName,
				};
			})
		);

		return filesWithBlobsURL;
	}
}
