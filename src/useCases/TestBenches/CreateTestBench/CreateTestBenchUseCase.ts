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

		const qrCodeBinary = await QRCodeFactory.create(testbench.id);

		const qrCodeSrc = await this.fileStorageProvider.save(
			`qrcodes/qrcode-${testbench.id}.jpg`,
			qrCodeBinary
		);

		testbench.qrCodeSrc = qrCodeSrc;

		await this.testBenchRepository.save(testbench);

		return { id: testbench.id };
	}
}
