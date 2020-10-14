import { TestBench } from "src/entities/TestBench/TestBench";

export interface ITestBenchRepository {
	save(testBench: TestBench): Promise<void>;
	modify(
		id: string,
		testBench: Partial<Omit<TestBench, "id">>,
		isActive?: boolean
	): Promise<void>;
	find(isActive?: boolean): Promise<TestBench[]>;
	findById(id: string, isActive?: boolean): Promise<TestBench>;
	delete(id: string): Promise<void>;
}
