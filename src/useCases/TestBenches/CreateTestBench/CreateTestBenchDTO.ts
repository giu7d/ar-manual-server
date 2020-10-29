export interface ICreateTestBenchRequestDTO {
	testBenchSerialNumber: string;

	componentSerialNumber: string;

	thumbnailSrc: string;

	instructions?: {
		description: string;
		step: number;
		sources: {
			type: "image" | "video" | "AR";
			src: string;
		}[];
		warnings?: { description: string }[];
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
