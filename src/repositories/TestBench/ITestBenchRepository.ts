import { TestBench } from "src/entities/TestBench/TestBench";

export interface ITestBenchRepository {
	save(testBench: TestBench): Promise<void>;
	modify(testBench: TestBench): Promise<void>;
	delete(id: string): Promise<void>;
	find(isActive?: boolean): Promise<TestBench[]>;
	findById(id: string, isActive?: boolean): Promise<TestBench>;
}
