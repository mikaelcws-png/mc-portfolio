export interface ContextData {
  role: string;
  goal: string;
  documents: string;
  approvers: string;
}

export type Authority = "independent" | "flag" | "escalate";

export interface ScopeData {
  authorities: Record<string, Authority>;
  tasks: { id: string; task: string; authority: Authority }[];
}

export type Cadence = "every-task" | "every-file" | "milestone" | "exception-only";

export interface ReviewData {
  cadence: Cadence;
  cadenceLabel: string;
  alwaysReview: string[];
}

export type AnalysisDepth = "quick" | "standard" | "thorough";
export type OutputFormat = "brief" | "standard" | "detailed";

export interface AnalysisData {
  depth: AnalysisDepth;
  focusAreas: string[];
  outputFormat: OutputFormat;
}

export interface CalibrationData {
  context?: ContextData;
  scope?: ScopeData;
  review?: ReviewData;
  analysis?: AnalysisData;
}
