import { TestBench } from "src/entities/TestBench/TestBench";

export interface IModifyTestBenchRequestDTO
	extends Partial<
		Pick<TestBench, "componentSerialNumber" | "testBenchSerialNumber">
	> {
	testBenchId: string;
}
