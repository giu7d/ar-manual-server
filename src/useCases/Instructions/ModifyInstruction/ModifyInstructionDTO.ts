export interface IModifyInstructionRequestDTO {
	testBenchId: string;
	instructionId: string;
	step?: number;
	description?: string;
}
