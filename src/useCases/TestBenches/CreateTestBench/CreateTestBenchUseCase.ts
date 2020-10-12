import { DTO } from "./CreateTestBenchDTO";

export class UseCase {
	async execute(data: DTO) {
		return data;
	}
}
