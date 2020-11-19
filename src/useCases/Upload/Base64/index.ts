import { GoogleFileStorageProvider } from "src/providers/FileStorage/implementation/GoogleFileStorageProvider";

import { UploadBase64Controller } from "./UploadBase64Controller";
import { UploadBase64UseCase } from "./UploadBase64UseCase";
import { uploadBase64Validator } from "./UploadBase64Validator";

const uploadBase64UseCase = new UploadBase64UseCase(
	new GoogleFileStorageProvider()
);

export const uploadBase64Controller = new UploadBase64Controller(
	uploadBase64UseCase,
	uploadBase64Validator
);
