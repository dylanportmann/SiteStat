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
    Object.defineProperty(window, "scrollTo", {
      value: vi.fn(),
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

  it("affiche la page théorie complète", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Théorie" }));

    expect(screen.getByText("Guide complet de revision")).toBeInTheDocument();
    expect(screen.getByText("Variables, collecte et plan d'etude")).toBeInTheDocument();
    expect(screen.getByText("Erreurs de decision et puissance")).toBeInTheDocument();
  });

  it("recherche dans les fiches de théorie", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Théorie" }));
    fireEvent.change(screen.getByLabelText("Rechercher dans la théorie"), {
      target: { value: "score z" }
    });

    expect(screen.getByText("Loi normale et score z")).toBeInTheDocument();
    expect(screen.queryByText("Test d'hypothese et p-value")).not.toBeInTheDocument();
  });

  it("affiche un schéma pédagogique dans les fiches de théorie", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Théorie" }));
    fireEvent.change(screen.getByLabelText("Rechercher dans la théorie"), {
      target: { value: "boxplot iqr" }
    });
    fireEvent.click(screen.getByRole("button", { name: "Tout ouvrir" }));

    expect(
      screen.getByRole("img", { name: /Schema du boxplot et de l'IQR/i })
    ).toBeInTheDocument();
  });

  it("retrouve une fiche via le texte d'un schéma", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Théorie" }));
    fireEvent.change(screen.getByLabelText("Rechercher dans la théorie"), {
      target: { value: "matrice decision" }
    });

    expect(screen.getByText("Erreur de type I et type II")).toBeInTheDocument();
  });

  it("filtre la théorie par thème", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Théorie" }));
    fireEvent.click(screen.getByRole("button", { name: /Erreurs/i }));
    fireEvent.click(screen.getByRole("button", { name: "Tout ouvrir" }));

    expect(screen.getByText("Erreurs de decision et puissance")).toBeInTheDocument();
    expect(screen.queryByText("Loi normale et score z")).not.toBeInTheDocument();
    expect(screen.getByRole("img", { name: /Matrice des decisions/i })).toBeInTheDocument();
  });

  it("ouvre et ferme les fiches de théorie en lot", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Théorie" }));
    fireEvent.click(screen.getByRole("button", { name: "Tout ouvrir" }));

    expect(screen.getByRole("button", { name: "Tout fermer" })).toBeInTheDocument();
  });

  it("revient au catalogue depuis une commande liée dans la théorie", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Théorie" }));
    fireEvent.change(screen.getByLabelText("Rechercher dans la théorie"), {
      target: { value: "famille des tests t" }
    });
    fireEvent.click(screen.getByRole("button", { name: "Tout ouvrir" }));
    fireEvent.click(screen.getByRole("button", { name: /t\.test\(x, mu=\)/i }));

    expect(screen.getByRole("button", { name: "Catalogue R" })).toHaveClass("is-active");
    expect(screen.getByLabelText("Rechercher une commande, un thème, un mot-clé...")).toHaveValue(
      "t.test(x, mu = 0)"
    );
  });
});
