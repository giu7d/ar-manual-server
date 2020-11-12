import QRCode from "qrcode";

export class QRCodeFactory {
	static async create(testBenchId: string): Promise<Uint8Array> {
		const buffer = await QRCode.toBuffer(JSON.stringify({ testBenchId }));

		const binary = Uint8Array.from(buffer);

		return binary;
	}
}
