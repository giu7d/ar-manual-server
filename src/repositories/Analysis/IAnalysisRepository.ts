import { Analysis } from "src/entities/Analysis/Analysis";

export interface IAnalysisRepository {
	save(analysis: Analysis): Promise<void>;
	find(testBenchId: string): Promise<Analysis[]>;
}
