import { AzureFileStorageProvider } from "src/providers/FileStorage/implementation/AzureFileStorageProvider";

import { UploadFilesController } from "./UploadFilesController";
import { UploadFilesUseCase } from "./UploadFilesUseCase";
import { uploadFilesValidator } from "./UploadFilesValidator";

const CONTAINER_NAME = "instruction-images";

export const azureFileStorageProvider = new AzureFileStorageProvider(
	CONTAINER_NAME
);

export const uploadFilesUseCase = new UploadFilesUseCase(
	azureFileStorageProvider
);

export const uploadFilesController = new UploadFilesController(
	uploadFilesUseCase,
	uploadFilesValidator
);
