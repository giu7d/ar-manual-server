export interface ICreateTestBenchRequestDTO {
	testBenchSerialNumber: string;

	componentSerialNumber: string;

	thumbnailSrc: string;

	instructions?: {
		step: number;
		title: string;
		description: string;
		sources: {
			type: "image" | "video" | "3D";
			src: string;
		}[];
		warnings?: {
			description: string;
		}[];
	}[];

	cao: {
		description: string;
		items: {
			description: string;
			frequency:
				| {
						series: string;
						reforce: string;
				  }
				| string;
			method: string;
			conformity: string;
		}[];
	};
}
