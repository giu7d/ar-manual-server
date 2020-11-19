import { Bucket, Storage } from "@google-cloud/storage";

import { IFileStorageProvider } from "../IFileStorageProvider";

const {
	GOOGLE_CLOUD_PROJECT = "",
	GOOGLE_CLOUD_CREDENTIALS = "",
	GOOGLE_CLOUD_BUCKET_NAME = "",
} = process.env;

export class GoogleFileStorageProvider implements IFileStorageProvider {
	private storage: Storage;
	private bucket: Bucket;

	constructor() {
		this.storage = new Storage({
			projectId: GOOGLE_CLOUD_PROJECT,
			keyFilename: GOOGLE_CLOUD_CREDENTIALS,
		});
		this.bucket = this.storage.bucket(GOOGLE_CLOUD_BUCKET_NAME);
	}

	async save(fileName: string, binary: Uint8Array): Promise<string> {
		const blob = this.bucket.file(fileName);

		await blob.save(binary, {
			gzip: true,
			public: true,
		});

		const url = `https://storage.googleapis.com/${this.bucket.name}/${blob.name}`;

		return url;
	}
}
