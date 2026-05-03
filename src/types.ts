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
  url: string;
}

export interface CommandFilters {
  query: string;
  themes: ThemeId[];
  packages: string[];
}
