import { BookMarked, CheckSquare, ChevronDown, ExternalLink, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { commands } from "./data/commands";
import { theorySections, theorySources } from "./data/theory";
import TheorySchemaView from "./TheorySchemaView";
import type { TheoryCard, TheorySection } from "./types";
import { normalizeText } from "./utils/search";

const commandById = new Map(commands.map((command) => [command.id, command]));
const sourceById = new Map(theorySources.map((source) => [source.id, source]));

function theoryCardHaystack(card: TheoryCard): string {
  return normalizeText(
    [
      card.title,
      card.summary,
      card.definition,
      card.intuition,
      card.details.join(" "),
      card.formulas?.map((formula) => `${formula.label} ${formula.expression} ${formula.explanation}`).join(" ") ?? "",
      card.schemas
        ?.map((schema) => `${schema.title} ${schema.description} ${schema.labels.join(" ")} ${schema.variant}`)
        .join(" ") ?? "",
      card.conditions?.join(" ") ?? "",
      card.interpretation?.join(" ") ?? "",
      card.pitfalls?.join(" ") ?? "",
      card.example ?? "",
      card.tags.join(" "),
      card.commandLinks
        .map((link) => {
          const command = commandById.get(link.commandId);
          return command ? `${link.label} ${command.command} ${command.title} ${command.tags.join(" ")}` : link.label;
        })
        .join(" ")
    ].join(" ")
  );
}

function sectionMatches(section: TheorySection, queryParts: string[]): boolean {
  if (queryParts.length === 0) {
    return true;
  }

  const sectionHaystack = normalizeText(
    [section.title, section.shortTitle, section.courseRef, section.intro, section.keyQuestions.join(" ")].join(" ")
  );

  return queryParts.every((part) => sectionHaystack.includes(part));
}

function filterTheory(query: string, selectedSections: string[]) {
  const queryParts = normalizeText(query).split(/\s+/).filter(Boolean);
  const selectedSet = new Set(selectedSections);

  return theorySections
    .filter((section) => selectedSet.size === 0 || selectedSet.has(section.id))
    .map((section) => {
      const keepAllCards = sectionMatches(section, queryParts);
      const cards =
        queryParts.length === 0 || keepAllCards
          ? section.cards
          : section.cards.filter((card) =>
              queryParts.every((part) => theoryCardHaystack(card).includes(part))
            );

      return { ...section, cards };
    })
    .filter((section) => section.cards.length > 0);
}

function TheoryCardView({
  card,
  open,
  onToggle,
  onCommandSearch
}: {
  card: TheoryCard;
  open: boolean;
  onToggle: (open: boolean) => void;
  onCommandSearch: (query: string) => void;
}) {
  return (
    <details
      className="theory-card"
      open={open}
      onToggle={(event) => onToggle(event.currentTarget.open)}
    >
      <summary>
        <div>
          <h3>{card.title}</h3>
          <p>{card.summary}</p>
        </div>
        <ChevronDown size={20} />
      </summary>

      <div className="theory-card__body">
        <section>
          <h4>Definition</h4>
          <p>{card.definition}</p>
        </section>

        <section>
          <h4>Intuition</h4>
          <p>{card.intuition}</p>
        </section>

        <section>
          <h4>Points cles</h4>
          <ul>
            {card.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </section>

        {card.formulas && card.formulas.length > 0 ? (
          <section>
            <h4>Formules</h4>
            <div className="formula-list">
              {card.formulas.map((formula) => (
                <article key={formula.label} className="formula-box">
                  <strong>{formula.label}</strong>
                  <code>{formula.expression}</code>
                  <span>{formula.explanation}</span>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {card.schemas && card.schemas.length > 0 ? (
          <section>
            <h4>Schemas</h4>
            <div className="schema-list">
              {card.schemas.map((schema) => (
                <TheorySchemaView key={schema.id} schema={schema} />
              ))}
            </div>
          </section>
        ) : null}

        {card.conditions && card.conditions.length > 0 ? (
          <section>
            <h4>Conditions</h4>
            <ul>
              {card.conditions.map((condition) => (
                <li key={condition}>{condition}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {card.interpretation && card.interpretation.length > 0 ? (
          <section>
            <h4>Interpretation</h4>
            <ul>
              {card.interpretation.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {card.pitfalls && card.pitfalls.length > 0 ? (
          <section className="pitfall-box">
            <h4>Pieges frequents</h4>
            <ul>
              {card.pitfalls.map((pitfall) => (
                <li key={pitfall}>{pitfall}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {card.example ? (
          <section className="theory-example">
            <h4>Mini-exemple</h4>
            <p>{card.example}</p>
          </section>
        ) : null}

        <section>
          <h4>Commandes R liees</h4>
          <div className="theory-command-links">
            {card.commandLinks.map((link) => {
              const command = commandById.get(link.commandId);
              return (
                <button
                  key={link.commandId}
                  type="button"
                  onClick={() => onCommandSearch(command?.command ?? link.label)}
                >
                  <span>{link.label}</span>
                  {command ? <code>{command.command}</code> : null}
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </details>
  );
}

export default function TheoryPage({
  onCommandSearch
}: {
  onCommandSearch: (query: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(() => new Set(["population-echantillon"]));

  const filteredSections = useMemo(
    () => filterTheory(query, selectedSections),
    [query, selectedSections]
  );

  const visibleCardIds = useMemo(
    () => filteredSections.flatMap((section) => section.cards.map((card) => card.id)),
    [filteredSections]
  );

  const visibleCardCount = visibleCardIds.length;
  const allVisibleOpen = visibleCardIds.length > 0 && visibleCardIds.every((id) => expandedCards.has(id));

  function toggleSection(sectionId: string) {
    setSelectedSections((current) =>
      current.includes(sectionId) ? current.filter((id) => id !== sectionId) : [...current, sectionId]
    );
  }

  function setVisibleCardsOpen(open: boolean) {
    setExpandedCards((current) => {
      const next = new Set(current);
      for (const id of visibleCardIds) {
        if (open) {
          next.add(id);
        } else {
          next.delete(id);
        }
      }
      return next;
    });
  }

  function setCardOpen(cardId: string, open: boolean) {
    setExpandedCards((current) => {
      const next = new Set(current);
      if (open) {
        next.add(cardId);
      } else {
        next.delete(cardId);
      }
      return next;
    });
  }

  return (
    <section className="theory-page" aria-label="Theorie Stat 1">
      <div className="theory-hero">
        <div>
          <p>Theorie Stat 1</p>
          <h2>Guide complet de revision</h2>
          <span>
            Fiches enrichies a partir du resume local, avec definitions, formules, conditions, erreurs frequentes
            et commandes R associees.
          </span>
        </div>
        <div className="theory-hero__stats" aria-label="Resume de la theorie">
          <strong>{theorySections.length}</strong>
          <span>themes</span>
          <strong>{theorySections.reduce((sum, section) => sum + section.cards.length, 0)}</strong>
          <span>fiches</span>
        </div>
      </div>

      <div className="theory-controls">
        <label className="theory-search" htmlFor="theory-search">
          <Search size={19} aria-hidden="true" />
          <input
            id="theory-search"
            aria-label="Rechercher dans la théorie"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher p-value, écart-type, score z, type I..."
          />
        </label>

        <div className="theory-control-buttons">
          <button type="button" onClick={() => setVisibleCardsOpen(!allVisibleOpen)}>
            <CheckSquare size={17} />
            <span>{allVisibleOpen ? "Tout fermer" : "Tout ouvrir"}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setSelectedSections([]);
            }}
            disabled={!query && selectedSections.length === 0}
          >
            Reinitialiser
          </button>
        </div>

        <div className="theory-theme-pills" aria-label="Filtrer la théorie par thème">
          {theorySections.map((section) => (
            <button
              key={section.id}
              type="button"
              className={selectedSections.includes(section.id) ? "is-active" : ""}
              aria-pressed={selectedSections.includes(section.id)}
              onClick={() => toggleSection(section.id)}
            >
              <span>{section.courseRef}</span>
              {section.shortTitle}
            </button>
          ))}
        </div>
      </div>

      <div className="theory-layout">
        <aside className="theory-toc" aria-label="Sommaire théorie">
          <div>
            <BookMarked size={18} />
            <strong>Sommaire</strong>
          </div>
          <nav>
            {filteredSections.map((section) => (
              <a key={section.id} href={`#theory-${section.id}`}>
                <span>{section.courseRef}</span>
                {section.shortTitle}
              </a>
            ))}
          </nav>
          <p>{visibleCardCount} fiches visibles</p>
        </aside>

        <div className="theory-sections">
          {filteredSections.map((section) => (
            <section className="theory-section" id={`theory-${section.id}`} key={section.id}>
              <header>
                <p>{section.courseRef}</p>
                <h2>{section.title}</h2>
                <span>{section.intro}</span>
              </header>

              <div className="key-question-list">
                {section.keyQuestions.map((question) => (
                  <span key={question}>{question}</span>
                ))}
              </div>

              <div className="theory-card-list">
                {section.cards.map((card) => (
                  <TheoryCardView
                    key={card.id}
                    card={card}
                    open={expandedCards.has(card.id)}
                    onToggle={(open) => setCardOpen(card.id, open)}
                    onCommandSearch={onCommandSearch}
                  />
                ))}
              </div>

              <footer className="theory-sources">
                {section.sourceIds.map((sourceId) => {
                  const source = sourceById.get(sourceId);
                  if (!source) {
                    return null;
                  }
                  if (!source.url) {
                    return <span key={source.id}>{source.label}</span>;
                  }
                  return (
                    <a href={source.url} target="_blank" rel="noreferrer" key={source.id}>
                      {source.label}
                      <ExternalLink size={13} />
                    </a>
                  );
                })}
              </footer>
            </section>
          ))}

          {filteredSections.length === 0 ? (
            <div className="empty-state">
              <Search size={32} />
              <h2>Aucune fiche trouvée</h2>
              <p>Modifie la recherche ou retire un filtre de thème.</p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
