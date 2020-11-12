import { QRCodeFactory } from "src/factories/QRCodeFactory";
import { TestBenchFactory } from "src/factories/TestBenchFactory";
import { IFileStorageProvider } from "src/providers/FileStorage/IFileStorageProvider";
import { ITestBenchRepository } from "src/repositories/TestBench/ITestBenchRepository";

import { ICreateTestBenchRequestDTO } from "./CreateTestBenchDTO";

export class CreateTestBenchUseCase {
	constructor(
		private testBenchRepository: ITestBenchRepository,
		private fileStorageProvider: IFileStorageProvider
	) {}

	async execute(data: ICreateTestBenchRequestDTO) {
		const testbench = TestBenchFactory.create(data);

		const qrCode = await QRCodeFactory.create(testbench.id);

		const qrCodeURL = await this.fileStorageProvider.save(
			`qrcode-${testbench.id}.jpg`,
			qrCode
		);

		testbench.qrCodeSrc = qrCodeURL;

		await this.testBenchRepository.save(testbench);

		return { id: testbench.id };
	}
}
