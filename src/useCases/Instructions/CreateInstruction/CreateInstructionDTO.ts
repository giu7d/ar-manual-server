export interface ICreateInstructionRequestDTO {
	testBenchId: string;
	description: string;
	sources: {
		type: "image" | "video" | "AR";
		src: string;
	}[];
	warnings: { description: string }[];
}
