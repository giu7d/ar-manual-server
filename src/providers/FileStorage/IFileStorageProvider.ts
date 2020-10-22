export interface IFileStorageProvider {
	save(filename: string, binary: Uint8Array): Promise<string>;
}
