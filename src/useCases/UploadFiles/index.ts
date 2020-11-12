import { GoogleFileStorageProvider } from "src/providers/FileStorage/implementation/GoogleFileStorageProvider";

import { UploadFilesController } from "./UploadFilesController";
import { UploadFilesUseCase } from "./UploadFilesUseCase";
import { uploadFilesValidator } from "./UploadFilesValidator";

const FOLDER_NAME = "instructions";

export const googleFileStorageProvider = new GoogleFileStorageProvider(
	FOLDER_NAME
);

export const uploadFilesUseCase = new UploadFilesUseCase(
	googleFileStorageProvider
);

export const uploadFilesController = new UploadFilesController(
	uploadFilesUseCase,
	uploadFilesValidator
);
