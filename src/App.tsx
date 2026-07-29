import { useEffect, useMemo, useState } from "react";
import {
  ATTRIBUTE_LABELS,
  ATTRIBUTE_SHORT_LABELS,
  NATIONALITIES,
  RARITY_LABELS,
  REROLLS_PER_CREATION,
  STARTING_AGE,
} from "./game/constants";
import {
  acquireAttribute,
  calculateOverall,
  createIdentity,
  determineArchetype,
  drawPlayer,
  reroll,
} from "./game/engine";
import { ATTACKERS } from "./game/players";
import {
  ATTRIBUTES,
  type DraftState,
  type Identity,
  type Nationality,
} from "./game/types";

type Stage = "identity" | "draft" | "result";

const EMPTY_IDENTITY: Omit<Identity, "academyClub"> = {
  name: "",
  nationality: "BR",
  position: "ATA",
  dominantFoot: "D",
  heartClub: "",
};

function App() {
  const [stage, setStage] = useState<Stage>("identity");
  const [identityForm, setIdentityForm] = useState(EMPTY_IDENTITY);
  const [draft, setDraft] = useState<DraftState | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("modo-carreira-creator-v2");
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved) as { stage: Stage; draft: DraftState };
      if (parsed.draft?.identity) {
        setDraft(parsed.draft);
        setStage(parsed.stage);
      }
    } catch {
      localStorage.removeItem("modo-carreira-creator-v2");
    }
  }, []);

  useEffect(() => {
    if (!draft) return;
    localStorage.setItem(
      "modo-carreira-creator-v2",
      JSON.stringify({ stage, draft }),
    );
  }, [draft, stage]);

  const currentPlayer = useMemo(
    () => ATTACKERS.find((player) => player.id === draft?.currentPlayerId),
    [draft?.currentPlayerId],
  );

  function startCreation(event: React.FormEvent) {
    event.preventDefault();
    if (!identityForm.name.trim() || !identityForm.heartClub.trim()) return;
    const identity = createIdentity({
      ...identityForm,
      name: identityForm.name.trim(),
      heartClub: identityForm.heartClub.trim(),
    });
    const player = drawPlayer();
    setDraft({
      identity,
      acquired: {},
      usedPlayerIds: [],
      currentPlayerId: player.id,
      rerollsLeft: REROLLS_PER_CREATION,
      completed: false,
    });
    setStage("draft");
  }

  function chooseAttribute(key: (typeof ATTRIBUTES)[number]) {
    if (!draft || !currentPlayer) return;
    const next = acquireAttribute(draft, key, currentPlayer);
    setDraft(next);
    if (next.completed) setStage("result");
  }

  function resetCreation() {
    localStorage.removeItem("modo-carreira-creator-v1");
    localStorage.removeItem("modo-carreira-creator-v2");
    setDraft(null);
    setIdentityForm(EMPTY_IDENTITY);
    setStage("identity");
  }

  if (stage === "identity") {
    return (
      <main className="shell identity-shell">
        <header className="brand">
          <span className="brand-mark">MC</span>
          <span>Modo Carreira</span>
          <span className="prototype-label">Criador v0.2</span>
        </header>
        <section className="identity-layout">
          <div className="hero-copy">
            <p className="eyebrow">A história começa aos {STARTING_AGE}</p>
            <h1>Crie um atacante que nunca existiu.</h1>
            <p>
              Cada atributo virá do auge de um jogador sorteado. Escolha bem:
              depois de confirmado, ele não poderá ser trocado.
            </p>
            <div className="rule-strip">
              <span>12 atributos</span>
              <span>3 novos sorteios</span>
              <span>100 atacantes</span>
            </div>
          </div>
          <form className="identity-card" onSubmit={startCreation}>
            <div className="section-heading">
              <span>01</span>
              <div>
                <p>Identidade</p>
                <h2>Quem é você?</h2>
              </div>
            </div>
            <label>
              Nome do atleta
              <input
                value={identityForm.name}
                onChange={(event) =>
                  setIdentityForm({ ...identityForm, name: event.target.value })
                }
                placeholder="Ex.: Toni"
                maxLength={24}
                required
              />
            </label>
            <div className="field-row">
              <label>
                Nacionalidade
                <select
                  value={identityForm.nationality}
                  onChange={(event) =>
                    setIdentityForm({
                      ...identityForm,
                      nationality: event.target.value as Nationality,
                    })
                  }
                >
                  {Object.entries(NATIONALITIES).map(([code, name]) => (
                    <option key={code} value={code}>
                      {name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Posição
                <select value="ATA" disabled>
                  <option value="ATA">Atacante</option>
                </select>
              </label>
            </div>
            <div className="field-row">
              <label>
                Pé dominante
                <select
                  value={identityForm.dominantFoot}
                  onChange={(event) =>
                    setIdentityForm({
                      ...identityForm,
                      dominantFoot: event.target.value as "D" | "E",
                    })
                  }
                >
                  <option value="D">Direito</option>
                  <option value="E">Esquerdo</option>
                </select>
              </label>
              <label>
                Clube do coração
                <input
                  value={identityForm.heartClub}
                  onChange={(event) =>
                    setIdentityForm({
                      ...identityForm,
                      heartClub: event.target.value,
                    })
                  }
                  placeholder="Ex.: Grêmio"
                  maxLength={32}
                  required
                />
              </label>
            </div>
            <button className="primary-button" type="submit">
              Começar sorteio <span>→</span>
            </button>
            <p className="form-note">
              Seu clube formador será sorteado entre equipes menores do país.
            </p>
          </form>
        </section>
      </main>
    );
  }

  if (!draft || !currentPlayer) return null;

  if (stage === "result") {
    const currentOverall = calculateOverall(draft.acquired, "currentValue");
    const potentialOverall = calculateOverall(draft.acquired, "potentialValue");
    return (
      <main className="shell result-shell">
        <header className="brand">
          <span className="brand-mark">MC</span>
          <span>Modo Carreira</span>
          <span className="prototype-label">Atleta criado</span>
        </header>
        <section className="result-hero">
          <div>
            <p className="eyebrow">Pronto para estrear</p>
            <h1>{draft.identity.name}</h1>
            <p className="result-subtitle">
              {STARTING_AGE} anos · ATA · {NATIONALITIES[draft.identity.nationality]} ·{" "}
              {draft.identity.dominantFoot === "D" ? "Destro" : "Canhoto"}
            </p>
            <div className="origin-line">
              Base: <strong>{draft.identity.academyClub}</strong>
              <span />
              Coração: <strong>{draft.identity.heartClub}</strong>
            </div>
          </div>
          <div className="overall-panel">
            <div>
              <span>Atual</span>
              <strong>{currentOverall}</strong>
            </div>
            <div>
              <span>Projeção</span>
              <strong>{potentialOverall}</strong>
            </div>
            <p>{determineArchetype(draft.acquired)}</p>
          </div>
        </section>
        <section className="result-grid">
          {ATTRIBUTES.map((key) => {
            const value = draft.acquired[key]!;
            return (
              <article className="result-attribute" key={key}>
                <div>
                  <span>{ATTRIBUTE_SHORT_LABELS[key]}</span>
                  <h3>{ATTRIBUTE_LABELS[key]}</h3>
                  <p>de {value.sourcePlayerName}</p>
                </div>
                <div className="value-pair">
                  <strong>{value.currentValue}</strong>
                  <span>máx. {value.potentialValue}</span>
                </div>
              </article>
            );
          })}
        </section>
        <div className="result-actions">
          <button className="secondary-button" onClick={resetCreation}>
            Criar outro atleta
          </button>
          <button className="primary-button" disabled>
            Iniciar carreira <span>em breve</span>
          </button>
        </div>
      </main>
    );
  }

  const selectedCount = Object.keys(draft.acquired).length;
  return (
    <main className="shell draft-shell">
      <header className="draft-header">
        <div className="brand">
          <span className="brand-mark">MC</span>
          <span>{draft.identity.name}</span>
        </div>
        <div className="draft-progress">
          <span>
            Atributo {selectedCount + 1} de {ATTRIBUTES.length}
          </span>
          <div>
            <i
              style={{ width: `${(selectedCount / ATTRIBUTES.length) * 100}%` }}
            />
          </div>
        </div>
        <button className="text-button" onClick={resetCreation}>
          Recomeçar
        </button>
      </header>

      <section className="draft-layout">
        <aside className="attribute-board">
          <div className="section-heading compact">
            <span>02</span>
            <div>
              <p>Construção</p>
              <h2>Seu atleta</h2>
            </div>
          </div>
          <div className="attribute-list">
            {ATTRIBUTES.map((key) => {
              const acquired = draft.acquired[key];
              return (
                <div className={`attribute-row ${acquired ? "filled" : ""}`} key={key}>
                  <span>{ATTRIBUTE_SHORT_LABELS[key]}</span>
                  <div>
                    <strong>{ATTRIBUTE_LABELS[key]}</strong>
                    <small>
                      {acquired ? `de ${acquired.sourcePlayerName}` : "Disponível"}
                    </small>
                  </div>
                  <b>{acquired?.currentValue ?? "—"}</b>
                </div>
              );
            })}
          </div>
        </aside>

        <section className={`player-card rarity-${currentPlayer.rarity}`}>
          <div className="card-topline">
            <span>{RARITY_LABELS[currentPlayer.rarity]}</span>
            <span>{currentPlayer.country}</span>
          </div>
          <div className="player-monogram">
            {currentPlayer.name
              .split(" ")
              .map((part) => part[0])
              .slice(0, 2)
              .join("")}
          </div>
          <p className="eyebrow">Jogador sorteado</p>
          <h1>{currentPlayer.name}</h1>
          <p className="peak-label">Auge considerado: {currentPlayer.peak}</p>
          <p className="player-note">{currentPlayer.note}</p>
          <div className="reroll-block">
            <span>{draft.rerollsLeft} novos sorteios restantes</span>
            <button
              className="secondary-button"
              disabled={draft.rerollsLeft <= 0}
              onClick={() => setDraft(reroll(draft))}
            >
              Sortear novamente
            </button>
          </div>
        </section>

        <section className="choice-panel">
          <p className="eyebrow">Escolha uma herança</p>
          <h2>Qual atributo você quer?</h2>
          <p className="choice-intro">
            Você começa com 70% da nota. O teto varia de +2 a +12:
            quanto maior a fonte, menor o bônus.
          </p>
          <div className="choice-list">
            {ATTRIBUTES.map((key) => {
              const locked = Boolean(draft.acquired[key]);
              return (
                <button
                  key={key}
                  disabled={locked}
                  onClick={() => chooseAttribute(key)}
                >
                  <span>
                    <small>{ATTRIBUTE_SHORT_LABELS[key]}</small>
                    <strong>{ATTRIBUTE_LABELS[key]}</strong>
                  </span>
                  {locked ? (
                    <em>Bloqueado</em>
                  ) : (
                    <b>{currentPlayer.attributes[key]}</b>
                  )}
                </button>
              );
            })}
          </div>
        </section>
      </section>
    </main>
  );
}

export default App;
