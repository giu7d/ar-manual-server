import { CAO } from "src/entities/CAO/CAO";
import { Instruction } from "src/entities/Instruction/Instruction";

export interface IModifyTestBenchRequestDTO {
	testBenchId: string;
	componentSerialNumber?: string;
	testBenchSerialNumber?: string;
	thumbnailSrc?: string;
	instructions?: Instruction[];
	cao?: CAO;
}
