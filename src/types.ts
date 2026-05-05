export type ThemeId =
  | "base"
  | "variables"
  | "descriptives"
  | "probabilites"
  | "methode"
  | "inference"
  | "erreurs";

export type SourceRefId = "r-base" | "r-stats" | "r-intro" | "cours";

export type LegendKind = "variable" | "statistic" | "argument" | "intermediate";

export interface ThemeDefinition {
  id: ThemeId;
  title: string;
  shortTitle: string;
  courseRef: string;
  color: "blue" | "green" | "amber" | "rose" | "violet" | "slate" | "teal";
}

export interface CommandEntry {
  id: string;
  theme: ThemeId;
  subtheme: string;
  packageName: "base" | "stats" | "graphics" | "grDevices" | "utils";
  title: string;
  command: string;
  description: string;
  example: string;
  tags: string[];
  legendKeys?: string[];
  warnings?: CommandWarning[];
  basicEquivalentSteps?: string[];
  sourceRefs: SourceRefId[];
}

export interface CommandWarning {
  title: string;
  body: string;
  items?: string[];
  examples?: string[];
}

export interface LegendEntry {
  id: string;
  label: string;
  kind: LegendKind;
  definition: string;
  expectedType: string;
  exampleValue: string;
  replaceWith: string;
  tags: string[];
  themeHints: ThemeId[];
}

export interface SourceRef {
  id: SourceRefId;
  label: string;
  url?: string;
}

export interface CommandFilters {
  query: string;
  themes: ThemeId[];
  packages: string[];
}

export interface TheorySource {
  id: string;
  label: string;
  url?: string;
}

export interface TheoryCommandLink {
  commandId: string;
  label: string;
}

export interface TheoryFormula {
  label: string;
  expression: string;
  explanation: string;
}

export type TheorySchemaVariant =
  | "population-flow"
  | "variable-tree"
  | "randomization-plan"
  | "center-skew"
  | "boxplot-iqr"
  | "graph-choices"
  | "probability-events"
  | "normal-z"
  | "t-vs-normal"
  | "scientific-cycle"
  | "sampling-distribution"
  | "hypothesis-pvalue"
  | "t-test-choice"
  | "error-matrix"
  | "alternative-tails";

export interface TheorySchema {
  id: string;
  title: string;
  description: string;
  variant: TheorySchemaVariant;
  labels: string[];
}

export interface TheoryCard {
  id: string;
  title: string;
  summary: string;
  definition: string;
  intuition: string;
  details: string[];
  formulas?: TheoryFormula[];
  conditions?: string[];
  interpretation?: string[];
  pitfalls?: string[];
  example?: string;
  schemas?: TheorySchema[];
  commandLinks: TheoryCommandLink[];
  tags: string[];
}

export interface TheorySection {
  id: Exclude<ThemeId, "base">;
  title: string;
  shortTitle: string;
  courseRef: string;
  intro: string;
  keyQuestions: string[];
  sourceIds: string[];
  cards: TheoryCard[];
}
