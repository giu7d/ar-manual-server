import { GoogleFileStorageProvider } from "src/providers/FileStorage/implementation/GoogleFileStorageProvider";

import { UploadFormDataController } from "./UploadFormDataController";
import { UploadFormDataUseCase } from "./UploadFormDataUseCase";
import { uploadFormDataValidator } from "./UploadFormDataValidator";

const uploadFormDataUseCase = new UploadFormDataUseCase(
	new GoogleFileStorageProvider()
);

export const uploadFormDataController = new UploadFormDataController(
	uploadFormDataUseCase,
	uploadFormDataValidator
);
