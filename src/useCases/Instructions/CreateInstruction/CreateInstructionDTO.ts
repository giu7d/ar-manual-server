export interface ICreateInstructionRequestDTO {
	testBenchId: string;
	title: string;
	description: string;
	sources: {
		type: "image" | "video" | "3D";
		src: string;
	}[];
	inspectionType: "VISUAL-INSPECTION" | "GEOMETRIC-INSPECTION";
	warnings: { description: string }[];
}
