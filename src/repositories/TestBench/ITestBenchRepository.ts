import { TestBench } from "src/entities/TestBench/TestBench";

export interface ITestBenchRepository {
	save(testBench: TestBench): Promise<void>;
}
