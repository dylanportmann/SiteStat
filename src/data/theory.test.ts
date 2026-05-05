import { describe, expect, it } from "vitest";
import { commands } from "./commands";
import { theorySchemaVariants, theorySections, theorySources } from "./theory";

describe("théorie statistique", () => {
  it("contient les thèmes du résumé de cours", () => {
    expect(theorySections.map((section) => section.id)).toEqual([
      "variables",
      "descriptives",
      "probabilites",
      "methode",
      "inference",
      "erreurs"
    ]);
  });

  it("fournit plusieurs fiches documentées par thème", () => {
    for (const section of theorySections) {
      expect(section.title).toBeTruthy();
      expect(section.intro).toBeTruthy();
      expect(section.keyQuestions.length).toBeGreaterThanOrEqual(3);
      expect(section.cards.length).toBeGreaterThanOrEqual(3);

      for (const card of section.cards) {
        expect(card.title).toBeTruthy();
        expect(card.summary).toBeTruthy();
        expect(card.definition).toBeTruthy();
        expect(card.intuition).toBeTruthy();
        expect(card.details.length).toBeGreaterThan(0);
        expect(card.commandLinks.length).toBeGreaterThan(0);
        expect(card.tags.length).toBeGreaterThan(0);
      }
    }
  });

  it("ne contient pas d'identifiants de fiche dupliqués", () => {
    const ids = theorySections.flatMap((section) => section.cards.map((card) => card.id));
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("référence uniquement des sources et commandes connues", () => {
    const sourceIds = new Set(theorySources.map((source) => source.id));
    const commandIds = new Set(commands.map((command) => command.id));

    for (const section of theorySections) {
      for (const sourceId of section.sourceIds) {
        expect(sourceIds.has(sourceId)).toBe(true);
      }

      for (const card of section.cards) {
        for (const link of card.commandLinks) {
          expect(commandIds.has(link.commandId)).toBe(true);
        }
      }
    }
  });

  it("contient des schémas exploitables et typés", () => {
    const cardsWithSchemas = theorySections.flatMap((section) =>
      section.cards.filter((card) => card.schemas && card.schemas.length > 0)
    );
    const schemaIds = cardsWithSchemas.flatMap((card) => card.schemas!.map((schema) => schema.id));
    const supportedVariants = new Set(theorySchemaVariants);

    expect(cardsWithSchemas.length).toBeGreaterThanOrEqual(12);
    expect(new Set(schemaIds).size).toBe(schemaIds.length);

    for (const card of cardsWithSchemas) {
      for (const schema of card.schemas!) {
        expect(schema.title).toBeTruthy();
        expect(schema.description).toBeTruthy();
        expect(schema.labels.length).toBeGreaterThan(0);
        expect(supportedVariants.has(schema.variant)).toBe(true);
      }
    }
  });
});
