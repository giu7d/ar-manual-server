import {
	AccountSASPermissions,
	AccountSASResourceTypes,
	AccountSASServices,
	BlobServiceClient,
	generateAccountSASQueryParameters,
	SASProtocol,
	StorageSharedKeyCredential,
} from "@azure/storage-blob";

import { addHours } from "src/utils/time";

import { IFileStorageProvider } from "../IFileStorageProvider";

const {
	AZURE_STORAGE_ACCOUNT_CONNECTION_STRING,
	AZURE_STORAGE_ACCOUNT_NAME,
	AZURE_STORAGE_ACCOUNT_KEY,
} = process.env;

export class AzureFileStorageProvider implements IFileStorageProvider {
	private containerName: string;

	private blobService: BlobServiceClient;

	constructor(containerName: string) {
		this.blobService = BlobServiceClient.fromConnectionString(
			AZURE_STORAGE_ACCOUNT_CONNECTION_STRING
		);
		this.containerName = containerName;
	}

	async save(filename: string, binary: Uint8Array) {
		const container = this.blobService.getContainerClient(this.containerName);

		const blob = container.getBlockBlobClient(filename);

		await blob.upload(binary, binary.length);

		return blob.url;
	}

	static getSAS() {
		const storageSharedKeyCredential = new StorageSharedKeyCredential(
			AZURE_STORAGE_ACCOUNT_NAME,
			AZURE_STORAGE_ACCOUNT_KEY
		);

		const expiresOn = addHours(5);

		const SAS = generateAccountSASQueryParameters(
			{
				expiresOn,
				permissions: AccountSASPermissions.parse("r"),
				protocol: SASProtocol.HttpsAndHttp,
				resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
				services: AccountSASServices.parse("b").toString(),
			},
			storageSharedKeyCredential
		);

		return SAS;
	}
}
