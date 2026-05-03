import { describe, expect, it } from "vitest";
import { commands } from "./commands";
import { legendById, legendEntries, legendEntriesForCommand } from "./legend";

describe("légende des variables", () => {
  it("ne contient pas d'identifiants dupliqués", () => {
    const ids = legendEntries.map((entry) => entry.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("inclut les entrées clés", () => {
    for (const id of ["x", "df-data", "na.rm", "alternative", "mu", "alpha", "ddl", "p-value"]) {
      expect(legendById.has(id)).toBe(true);
    }
  });

  it("ne référence que des clés de légende connues dans les commandes", () => {
    for (const command of commands) {
      for (const key of command.legendKeys ?? []) {
        expect(legendById.has(key)).toBe(true);
      }
    }
  });

  it("détecte les variables utiles d'une moyenne", () => {
    const command = commands.find((entry) => entry.id === "descriptives-mean");
    expect(command).toBeDefined();

    const labels = legendEntriesForCommand(command!).map((entry) => entry.id);
    expect(labels).toEqual(expect.arrayContaining(["x", "na.rm", "x-ok"]));
  });

  it("détecte les paramètres d'un test t", () => {
    const command = commands.find((entry) => entry.id === "inference-t-test-one");
    expect(command).toBeDefined();

    const labels = legendEntriesForCommand(command!).map((entry) => entry.id);
    expect(labels).toEqual(expect.arrayContaining(["x", "mu", "n", "t-obs", "ddl", "p-value"]));
  });

  it("distingue df data frame et df degrés de liberté", () => {
    const dataframeCommand = commands.find((entry) => entry.id === "base-data-frame-index");
    const dfArgumentCommand = commands.find((entry) => entry.id === "prob-t-quantile");

    expect(legendEntriesForCommand(dataframeCommand!).map((entry) => entry.id)).toContain(
      "df-data"
    );
    expect(legendEntriesForCommand(dfArgumentCommand!).map((entry) => entry.id)).toContain(
      "df-argument"
    );
  });
});
