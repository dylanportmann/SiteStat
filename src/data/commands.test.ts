import { describe, expect, it } from "vitest";
import { commands, sourceRefs, themes } from "./commands";

describe("catalogue des commandes", () => {
  it("ne contient pas d'identifiants dupliqués", () => {
    const ids = commands.map((entry) => entry.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("renseigne les champs obligatoires pour chaque commande", () => {
    for (const entry of commands) {
      expect(entry.title).toBeTruthy();
      expect(entry.command).toBeTruthy();
      expect(entry.description).toBeTruthy();
      expect(entry.example).toBeTruthy();
      expect(entry.tags.length).toBeGreaterThan(0);
      expect(entry.sourceRefs.length).toBeGreaterThan(0);
    }
  });

  it("contient au moins une commande dans chaque thème", () => {
    for (const theme of themes) {
      expect(commands.some((entry) => entry.theme === theme.id)).toBe(true);
    }
  });

  it("référence uniquement des sources connues", () => {
    const validSourceIds = new Set(sourceRefs.map((source) => source.id));
    for (const entry of commands) {
      for (const sourceId of entry.sourceRefs) {
        expect(validSourceIds.has(sourceId)).toBe(true);
      }
    }
  });

  it("inclut les déroulés pédagogiques clés", () => {
    const mean = commands.find((entry) => entry.id === "descriptives-mean");
    const tTest = commands.find((entry) => entry.id === "inference-t-test-one");
    const chisq = commands.find((entry) => entry.id === "inference-chisq");

    expect(mean?.basicEquivalentSteps?.join(" ")).toContain("sum(x_ok) / length(x_ok)");
    expect(tTest?.basicEquivalentSteps?.join(" ")).toContain("pt(-abs(t_obs)");
    expect(chisq?.basicEquivalentSteps?.join(" ")).toContain("attendus");
  });

  it("affiche un warning alternative sur les commandes t.test", () => {
    const tTestCommands = commands.filter((entry) => entry.command.startsWith("t.test"));

    expect(tTestCommands.length).toBeGreaterThan(0);
    for (const entry of tTestCommands) {
      expect(entry.warnings?.[0]?.title).toBe("Attention: alternative change le sens du test");
      expect(entry.warnings?.[0]?.body).toContain("alternative = \"greater\"");
      expect(entry.legendKeys).toContain("alternative");
    }
  });
});
