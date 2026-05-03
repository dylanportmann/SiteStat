import { useMemo, useState } from "react";
import {
  BookOpen,
  Check,
  ChevronDown,
  CircleHelp,
  Copy,
  ExternalLink,
  Filter,
  Layers,
  Package,
  Power,
  Search,
  Terminal,
  X
} from "lucide-react";
import { commands, sourceRefs, themes } from "./data/commands";
import {
  legendEntries,
  legendEntriesForCommand,
  legendKindLabels
} from "./data/legend";
import type {
  CommandEntry,
  LegendEntry,
  LegendKind,
  ThemeDefinition,
  ThemeId
} from "./types";
import { filterCommands, groupByTheme, normalizeText } from "./utils/search";

const themeById = new Map(themes.map((theme) => [theme.id, theme]));
const sourceById = new Map(sourceRefs.map((source) => [source.id, source]));

function copyWithFallback(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text);
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  document.body.removeChild(textarea);

  return copied
    ? Promise.resolve()
    : Promise.reject(new Error("La copie a échoué."));
}

function toggleValue<T extends string>(values: T[], value: T): T[] {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

function ThemePill({
  theme,
  count,
  active,
  onToggle
}: {
  theme: ThemeDefinition;
  count: number;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      className={`theme-pill theme-${theme.color}${active ? " is-active" : ""}`}
      type="button"
      aria-pressed={active}
      onClick={onToggle}
    >
      <span className="theme-pill__name">{theme.shortTitle}</span>
      <span className="theme-pill__count">{count}</span>
    </button>
  );
}

function LegendItem({ entry }: { entry: LegendEntry }) {
  return (
    <article className={`legend-item legend-kind-${entry.kind}`}>
      <div className="legend-item__top">
        <code>{entry.label}</code>
        <span>{legendKindLabels[entry.kind]}</span>
      </div>
      <p>{entry.definition}</p>
      <dl>
        <div>
          <dt>Type</dt>
          <dd>{entry.expectedType}</dd>
        </div>
        <div>
          <dt>Exemple</dt>
          <dd>
            <code>{entry.exampleValue}</code>
          </dd>
        </div>
        <div>
          <dt>Remplacer par</dt>
          <dd>{entry.replaceWith}</dd>
        </div>
      </dl>
    </article>
  );
}

function LegendPanel({
  query,
  selectedKinds,
  filteredEntries,
  onQueryChange,
  onToggleKind,
  onClear
}: {
  query: string;
  selectedKinds: LegendKind[];
  filteredEntries: LegendEntry[];
  onQueryChange: (query: string) => void;
  onToggleKind: (kind: LegendKind) => void;
  onClear: () => void;
}) {
  const kinds = Object.keys(legendKindLabels) as LegendKind[];

  return (
    <details className="legend-panel" open>
      <summary>
        <div>
          <span>Légende</span>
          <strong>{filteredEntries.length}</strong>
        </div>
        <ChevronDown size={19} />
      </summary>

      <div className="legend-panel__body">
        <div className="legend-controls">
          <label className="legend-search" htmlFor="legend-search">
            <Search size={18} aria-hidden="true" />
            <input
              id="legend-search"
              aria-label="Rechercher dans la légende"
              type="search"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Rechercher x, alpha, degrés de liberté, na.rm..."
            />
          </label>

          <div className="legend-kind-pills" aria-label="Filtrer la légende par type">
            {kinds.map((kind) => (
              <button
                key={kind}
                type="button"
                className={selectedKinds.includes(kind) ? "is-active" : ""}
                aria-pressed={selectedKinds.includes(kind)}
                onClick={() => onToggleKind(kind)}
              >
                {legendKindLabels[kind]}
              </button>
            ))}
            <button type="button" onClick={onClear} disabled={!query && selectedKinds.length === 0}>
              Effacer
            </button>
          </div>
        </div>

        <div className="legend-grid">
          {filteredEntries.map((entry) => (
            <LegendItem key={entry.id} entry={entry} />
          ))}
        </div>
      </div>
    </details>
  );
}

function CommandCard({
  entry,
  copied,
  onCopy
}: {
  entry: CommandEntry;
  copied: boolean;
  onCopy: (entry: CommandEntry) => void;
}) {
  const theme = themeById.get(entry.theme)!;
  const commandLegendEntries = legendEntriesForCommand(entry);

  return (
    <article className={`command-card theme-${theme.color}`}>
      <div className="command-card__top">
        <div>
          <div className="meta-line">
            <span>{theme.courseRef}</span>
            <span>{entry.subtheme}</span>
            <span>{entry.packageName}</span>
          </div>
          <h3>{entry.title}</h3>
        </div>
        <button
          className={`copy-button${copied ? " is-copied" : ""}`}
          type="button"
          onClick={() => onCopy(entry)}
          aria-label={`Copier ${entry.command}`}
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
          <span>{copied ? "Copié" : "Copier"}</span>
        </button>
      </div>

      <div className="command-line">
        <Terminal size={18} aria-hidden="true" />
        <code>{entry.command}</code>
      </div>

      <p className="description">{entry.description}</p>

      <div className="example-row">
        <span>Exemple</span>
        <code>{entry.example}</code>
      </div>

      {entry.warnings && entry.warnings.length > 0 ? (
        <div className="warning-stack" aria-label="Avertissements">
          {entry.warnings.map((warning) => (
            <aside className="command-warning" key={warning.title}>
              <div className="command-warning__top">
                <span aria-hidden="true">!</span>
                <strong>{warning.title}</strong>
              </div>
              <p>{warning.body}</p>
              {warning.items && warning.items.length > 0 ? (
                <ul>
                  {warning.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
              {warning.examples && warning.examples.length > 0 ? (
                <div className="warning-examples">
                  {warning.examples.map((example) => (
                    <code key={example}>{example}</code>
                  ))}
                </div>
              ) : null}
            </aside>
          ))}
        </div>
      ) : null}

      {entry.basicEquivalentSteps && entry.basicEquivalentSteps.length > 0 ? (
        <details className="equivalent">
          <summary>
            <span>Voir les étapes basiques</span>
            <ChevronDown size={18} />
          </summary>
          <ol>
            {entry.basicEquivalentSteps.map((step) => (
              <li key={step}>
                <code>{step}</code>
              </li>
            ))}
          </ol>
        </details>
      ) : null}

      {commandLegendEntries.length > 0 ? (
        <details className="command-legend">
          <summary>
            <span>Variables utilisées</span>
            <ChevronDown size={18} />
          </summary>
          <div className="command-legend__list">
            {commandLegendEntries.map((legend) => (
              <div key={legend.id} className="command-legend__item">
                <code>{legend.label}</code>
                <span>{legend.definition}</span>
              </div>
            ))}
          </div>
        </details>
      ) : null}

      <div className="tag-row" aria-label="Mots-clés">
        {entry.tags.slice(0, 6).map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <div className="source-row">
        {entry.sourceRefs.map((sourceId) => {
          const source = sourceById.get(sourceId)!;
          return (
            <a key={source.id} href={source.url} target="_blank" rel="noreferrer">
              {source.label}
              <ExternalLink size={13} />
            </a>
          );
        })}
      </div>
    </article>
  );
}

function App() {
  const [query, setQuery] = useState("");
  const [selectedThemes, setSelectedThemes] = useState<ThemeId[]>([]);
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [legendQuery, setLegendQuery] = useState("");
  const [selectedLegendKinds, setSelectedLegendKinds] = useState<LegendKind[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copyError, setCopyError] = useState("");
  const [shutdownState, setShutdownState] = useState<"idle" | "pending" | "done" | "error">(
    "idle"
  );

  const packages = useMemo(
    () => Array.from(new Set(commands.map((entry) => entry.packageName))).sort(),
    []
  );

  const themeCounts = useMemo(() => {
    return themes.reduce<Record<ThemeId, number>>(
      (counts, theme) => {
        counts[theme.id] = commands.filter((entry) => entry.theme === theme.id).length;
        return counts;
      },
      {
        base: 0,
        variables: 0,
        descriptives: 0,
        probabilites: 0,
        methode: 0,
        inference: 0,
        erreurs: 0
      }
    );
  }, []);

  const filteredCommands = useMemo(
    () =>
      filterCommands(commands, {
        query,
        themes: selectedThemes,
        packages: selectedPackages
      }),
    [query, selectedThemes, selectedPackages]
  );

  const groupedCommands = useMemo(() => groupByTheme(filteredCommands), [filteredCommands]);

  const filteredLegendEntries = useMemo(() => {
    const queryParts = normalizeText(legendQuery).split(/\s+/).filter(Boolean);
    const kindSet = new Set(selectedLegendKinds);

    return legendEntries.filter((entry) => {
      if (kindSet.size > 0 && !kindSet.has(entry.kind)) {
        return false;
      }

      if (queryParts.length === 0) {
        return true;
      }

      const haystack = normalizeText(
        [
          entry.label,
          legendKindLabels[entry.kind],
          entry.definition,
          entry.expectedType,
          entry.exampleValue,
          entry.replaceWith,
          entry.tags.join(" ")
        ].join(" ")
      );

      return queryParts.every((part) => haystack.includes(part));
    });
  }, [legendQuery, selectedLegendKinds]);

  const activeFilterCount = selectedThemes.length + selectedPackages.length + (query ? 1 : 0);

  async function handleCopy(entry: CommandEntry) {
    try {
      await copyWithFallback(entry.command);
      setCopiedId(entry.id);
      setCopyError("");
      window.setTimeout(() => setCopiedId((current) => (current === entry.id ? null : current)), 1400);
    } catch {
      setCopyError("Copie impossible dans ce navigateur.");
    }
  }

  async function handleShutdown() {
    setShutdownState("pending");
    try {
      await fetch("/__shutdown", { method: "POST" });
      setShutdownState("done");
    } catch {
      setShutdownState("error");
    }
  }

  function resetFilters() {
    setQuery("");
    setSelectedThemes([]);
    setSelectedPackages([]);
  }

  function resetLegendFilters() {
    setLegendQuery("");
    setSelectedLegendKinds([]);
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-block">
          <div className="brand-mark">
            <BookOpen size={24} />
          </div>
          <div>
            <p>SiteStat</p>
            <h1>Commandes R - Stat 1</h1>
          </div>
        </div>
        <button
          className="shutdown-button"
          type="button"
          onClick={handleShutdown}
          disabled={shutdownState === "pending" || shutdownState === "done"}
        >
          <Power size={18} />
          <span>
            {shutdownState === "pending"
              ? "Arrêt..."
              : shutdownState === "done"
                ? "Arrêt demandé"
                : "Arrêter"}
          </span>
        </button>
      </header>

      <main>
        <section className="controls" aria-label="Recherche et filtres">
          <div className="search-panel">
            <label className="search-box" htmlFor="command-search">
              <Search size={21} aria-hidden="true" />
              <input
                id="command-search"
                aria-label="Rechercher une commande, un thème, un mot-clé..."
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Rechercher une commande, un thème, un mot-clé..."
              />
            </label>
            <button
              className="reset-button"
              type="button"
              onClick={resetFilters}
              disabled={activeFilterCount === 0}
            >
              <X size={18} />
              <span>Réinitialiser</span>
            </button>
          </div>

          <div className="filter-grid">
            <div className="filter-group" aria-label="Filtrer par thème">
              <div className="filter-title">
                <Filter size={17} />
                <span>Thèmes</span>
              </div>
              <div className="theme-pills">
                {themes.map((theme) => (
                  <ThemePill
                    key={theme.id}
                    theme={theme}
                    count={themeCounts[theme.id]}
                    active={selectedThemes.includes(theme.id)}
                    onToggle={() => setSelectedThemes((current) => toggleValue(current, theme.id))}
                  />
                ))}
              </div>
            </div>

            <div className="filter-group package-filter" aria-label="Filtrer par package">
              <div className="filter-title">
                <Package size={17} />
                <span>Packages</span>
              </div>
              <div className="package-pills">
                {packages.map((packageName) => (
                  <button
                    key={packageName}
                    className={selectedPackages.includes(packageName) ? "is-active" : ""}
                    type="button"
                    aria-pressed={selectedPackages.includes(packageName)}
                    onClick={() =>
                      setSelectedPackages((current) => toggleValue(current, packageName))
                    }
                  >
                    {packageName}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="result-bar" aria-live="polite">
          <div>
            <Layers size={19} />
            <strong>{filteredCommands.length}</strong>
            <span>commandes</span>
          </div>
          <div>
            <CircleHelp size={19} />
            <strong>
              {filteredCommands.filter((entry) => entry.basicEquivalentSteps?.length).length}
            </strong>
            <span>déroulés</span>
          </div>
          {copyError ? <p role="alert">{copyError}</p> : null}
          {shutdownState === "error" ? (
            <p role="alert">Arrêt web indisponible. Utilise Arreter SiteStat.command.</p>
          ) : null}
        </section>

        <LegendPanel
          query={legendQuery}
          selectedKinds={selectedLegendKinds}
          filteredEntries={filteredLegendEntries}
          onQueryChange={setLegendQuery}
          onToggleKind={(kind) =>
            setSelectedLegendKinds((current) => toggleValue(current, kind))
          }
          onClear={resetLegendFilters}
        />

        <section className="command-sections" aria-label="Résultats">
          {themes.map((theme) => {
            const entries = groupedCommands[theme.id];
            if (entries.length === 0) {
              return null;
            }

            return (
              <section className="theme-section" key={theme.id}>
                <div className="theme-heading">
                  <div>
                    <p>{theme.courseRef}</p>
                    <h2>{theme.title}</h2>
                  </div>
                  <span>{entries.length}</span>
                </div>
                <div className="command-grid">
                  {entries.map((entry) => (
                    <CommandCard
                      key={entry.id}
                      entry={entry}
                      copied={copiedId === entry.id}
                      onCopy={handleCopy}
                    />
                  ))}
                </div>
              </section>
            );
          })}

          {filteredCommands.length === 0 ? (
            <div className="empty-state">
              <Search size={32} />
              <h2>Aucun résultat</h2>
              <p>Modifie la recherche ou retire un filtre.</p>
            </div>
          ) : null}
        </section>
      </main>
    </div>
  );
}

export default App;
