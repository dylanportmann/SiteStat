import type { CommandEntry, CommandFilters, ThemeId } from "../types";
import { legendEntriesForCommand } from "../data/legend";

export function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

function entryHaystack(entry: CommandEntry): string {
  return normalizeText(
    [
      entry.title,
      entry.command,
      entry.description,
      entry.example,
      entry.subtheme,
      entry.packageName,
      entry.tags.join(" "),
      entry.warnings
        ?.map((warning) =>
          [warning.title, warning.body, warning.items?.join(" ") ?? "", warning.examples?.join(" ") ?? ""].join(" ")
        )
        .join(" ") ?? "",
      entry.basicEquivalentSteps?.join(" ") ?? "",
      legendEntriesForCommand(entry)
        .map((legend) =>
          [
            legend.label,
            legend.definition,
            legend.expectedType,
            legend.exampleValue,
            legend.replaceWith,
            legend.tags.join(" ")
          ].join(" ")
        )
        .join(" ")
    ].join(" ")
  );
}

export function filterCommands(
  entries: CommandEntry[],
  filters: CommandFilters
): CommandEntry[] {
  const normalizedQuery = normalizeText(filters.query);
  const queryParts = normalizedQuery.split(/\s+/).filter(Boolean);
  const themeSet = new Set<ThemeId>(filters.themes);
  const packageSet = new Set(filters.packages);

  return entries.filter((entry) => {
    if (themeSet.size > 0 && !themeSet.has(entry.theme)) {
      return false;
    }

    if (packageSet.size > 0 && !packageSet.has(entry.packageName)) {
      return false;
    }

    if (queryParts.length === 0) {
      return true;
    }

    const haystack = entryHaystack(entry);
    return queryParts.every((part) => haystack.includes(part));
  });
}

export function groupByTheme(entries: CommandEntry[]): Record<ThemeId, CommandEntry[]> {
  const initialGroups: Record<ThemeId, CommandEntry[]> = {
    base: [],
    variables: [],
    descriptives: [],
    probabilites: [],
    methode: [],
    inference: [],
    erreurs: []
  };

  return entries.reduce<Record<ThemeId, CommandEntry[]>>((groups, entry) => {
    groups[entry.theme].push(entry);
    return groups;
  }, initialGroups);
}
