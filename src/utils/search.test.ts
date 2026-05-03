import { describe, expect, it } from "vitest";
import { commands } from "../data/commands";
import { filterCommands, groupByTheme, normalizeText } from "./search";

describe("recherche et filtres", () => {
  it("normalise la casse et les accents", () => {
    expect(normalizeText("Écart-Type Médiane")).toBe("ecart-type mediane");
  });

  it("trouve une commande avec une requête accentuée ou non", () => {
    const results = filterCommands(commands, {
      query: "mediane",
      themes: [],
      packages: []
    });

    expect(results.some((entry) => entry.id === "descriptives-median")).toBe(true);
  });

  it("filtre par thème", () => {
    const results = filterCommands(commands, {
      query: "test",
      themes: ["inference"],
      packages: []
    });

    expect(results.length).toBeGreaterThan(0);
    expect(results.every((entry) => entry.theme === "inference")).toBe(true);
  });

  it("filtre par package", () => {
    const results = filterCommands(commands, {
      query: "graphique",
      themes: [],
      packages: ["graphics"]
    });

    expect(results.length).toBeGreaterThan(0);
    expect(results.every((entry) => entry.packageName === "graphics")).toBe(true);
  });

  it("trouve une commande à partir d'une définition de légende", () => {
    const results = filterCommands(commands, {
      query: "degres liberte",
      themes: [],
      packages: []
    });

    expect(results.some((entry) => entry.id === "erreurs-alpha-critical")).toBe(true);
  });

  it("trouve les tests t avec alternative ou unilatéral", () => {
    const alternativeResults = filterCommands(commands, {
      query: "alternative",
      themes: [],
      packages: []
    });
    const oneSidedResults = filterCommands(commands, {
      query: "unilateral",
      themes: [],
      packages: []
    });

    expect(alternativeResults.some((entry) => entry.id === "inference-t-test-one")).toBe(true);
    expect(oneSidedResults.some((entry) => entry.id === "inference-t-test-independent")).toBe(true);
  });

  it("groupe les résultats dans tous les thèmes attendus", () => {
    const grouped = groupByTheme(commands);
    expect(Object.keys(grouped)).toEqual([
      "base",
      "variables",
      "descriptives",
      "probabilites",
      "methode",
      "inference",
      "erreurs"
    ]);
  });
});
