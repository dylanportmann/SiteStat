import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";

describe("App", () => {
  beforeEach(() => {
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: vi.fn().mockResolvedValue(undefined)
      },
      configurable: true
    });
  });

  it("affiche le catalogue et filtre la recherche", () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText("Rechercher une commande, un thème, un mot-clé..."), {
      target: { value: "z-score" }
    });

    expect(screen.getByText("Calculer un score z")).toBeInTheDocument();
  });

  it("filtre les résultats par thème", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: /Inférence/i }));

    expect(screen.getByText("Test t à un échantillon")).toBeInTheDocument();
    expect(screen.queryByText("Créer un vecteur")).not.toBeInTheDocument();
  });

  it("ouvre un déroulé pédagogique", () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText("Rechercher une commande, un thème, un mot-clé..."), {
      target: { value: "mean(x" }
    });
    fireEvent.click(screen.getAllByText("Voir les étapes basiques")[0]);

    expect(screen.getByText("sum(x_ok) / length(x_ok)")).toBeInTheDocument();
  });

  it("copie une commande en un clic", async () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText("Rechercher une commande, un thème, un mot-clé..."), {
      target: { value: "read.csv" }
    });
    fireEvent.click(screen.getByRole("button", { name: /Copier read\.csv/i }));

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith("read.csv(\"donnees.csv\")");
    });
  });

  it("filtre la légende globale", () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText("Rechercher dans la légende"), {
      target: { value: "degrés de liberté" }
    });

    expect(screen.getAllByText("ddl").length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Degrés de liberté utilisés/).length).toBeGreaterThan(0);
  });

  it("affiche les variables utilisées dans une carte", () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText("Rechercher une commande, un thème, un mot-clé..."), {
      target: { value: "t.test(x, mu" }
    });

    const card = screen.getByText("Test t à un échantillon").closest("article");
    expect(card).toBeTruthy();
    fireEvent.click(within(card!).getByText("Variables utilisées"));

    expect(within(card!).getByText("mu")).toBeInTheDocument();
    expect(within(card!).getByText(/Moyenne théorique de référence/)).toBeInTheDocument();
  });

  it("affiche le warning alternative sur un t.test", () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText("Rechercher une commande, un thème, un mot-clé..."), {
      target: { value: "t.test(x, mu" }
    });

    const card = screen.getByText("Test t à un échantillon").closest("article");
    expect(card).toBeTruthy();

    expect(
      within(card!).getByText("Attention: alternative change le sens du test")
    ).toBeInTheDocument();
    expect(
      within(card!).getByText('t.test(x, mu = 0, alternative = "greater")')
    ).toBeInTheDocument();
    expect(
      within(card!).getByText('t.test(x, mu = 0, alternative = "less")')
    ).toBeInTheDocument();
  });
});
