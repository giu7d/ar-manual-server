export interface ICreateInstructionRequestDTO {
	testBenchId: string;
	title: string;
	description: string;
	sources: {
		type: "image" | "video" | "3D";
		src: string;
	}[];
	warnings: { description: string }[];
}
