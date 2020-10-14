export interface ICreateInstructionRequestDTO {
	testBenchId: string;
	description: string;
	step: number;
	sources: {
		type: "image" | "video" | "AR";
		src: string;
	}[];
	warnings: { description: string }[];
}
