import { Analysis } from "src/entities/Analysis/Analysis";
import { AnalysisStep } from "src/entities/AnalysisStep/AnalysisStep";

export interface IAnalysisStepRepository {
	findByAnalysis(analysis: Analysis[]): Promise<AnalysisStep[]>;
}
