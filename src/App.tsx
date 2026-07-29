import { useEffect, useMemo, useState } from "react";
import {
  NATIONALITIES,
  POSITION_CONFIGS,
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
import { PLAYER_POOLS } from "./game/players";
import {
  POSITIONS,
  type AttributeKey,
  type DraftState,
  type Identity,
  type Nationality,
  type Position,
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
    const saved = localStorage.getItem("modo-carreira-creator-v4");
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved) as { stage: Stage; draft: DraftState };
      if (parsed.draft?.identity) {
        setDraft(parsed.draft);
        setStage(parsed.stage);
      }
    } catch {
      localStorage.removeItem("modo-carreira-creator-v4");
    }
  }, []);

  useEffect(() => {
    if (!draft) return;
    localStorage.setItem(
      "modo-carreira-creator-v4",
      JSON.stringify({ stage, draft }),
    );
  }, [draft, stage]);

  const activePosition = draft?.identity.position ?? identityForm.position;
  const positionConfig = POSITION_CONFIGS[activePosition];
  const attributes = positionConfig.attributes;
  const totalPlayerProfiles = Object.values(PLAYER_POOLS).reduce(
    (total, pool) => total + pool.length,
    0,
  );

  const currentPlayer = useMemo(() => {
    if (!draft) return undefined;
    return PLAYER_POOLS[draft.identity.position].find(
      (player) => player.id === draft.currentPlayerId,
    );
  }, [draft]);

  function startCreation(event: React.FormEvent) {
    event.preventDefault();
    if (!identityForm.name.trim() || !identityForm.heartClub.trim()) return;
    const identity = createIdentity({
      ...identityForm,
      name: identityForm.name.trim(),
      heartClub: identityForm.heartClub.trim(),
    });
    const player = drawPlayer(identity.position);
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

  function chooseAttribute(key: AttributeKey) {
    if (!draft || !currentPlayer) return;
    const next = acquireAttribute(draft, key, currentPlayer);
    setDraft(next);
    if (next.completed) setStage("result");
  }

  function resetCreation() {
    localStorage.removeItem("modo-carreira-creator-v1");
    localStorage.removeItem("modo-carreira-creator-v2");
    localStorage.removeItem("modo-carreira-creator-v3");
    localStorage.removeItem("modo-carreira-creator-v4");
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
          <span className="prototype-label">Criador v0.6</span>
        </header>
        <section className="identity-layout">
          <div className="hero-copy">
            <p className="eyebrow">A história começa aos {STARTING_AGE}</p>
            <h1>Crie um jogador que nunca existiu.</h1>
            <p>
              Cada atributo virá do auge de um jogador sorteado. Escolha bem:
              depois de confirmado, ele não poderá ser trocado.
            </p>
            <div className="rule-strip">
              <span>12 atributos</span>
              <span>3 novos sorteios</span>
              <span>{totalPlayerProfiles} perfis no banco</span>
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
                <select
                  value={identityForm.position}
                  onChange={(event) =>
                    setIdentityForm({
                      ...identityForm,
                      position: event.target.value as Position,
                    })
                  }
                >
                  {POSITIONS.map((position) => (
                    <option key={position} value={position}>
                      {POSITION_CONFIGS[position].label}
                    </option>
                  ))}
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

  if (!draft) return null;

  if (stage === "result") {
    const currentOverall = calculateOverall(
      draft.identity.position,
      draft.acquired,
      "currentValue",
    );
    const naturalOverall = calculateOverall(
      draft.identity.position,
      draft.acquired,
      "naturalCeiling",
    );
    const basePotentialOverall = calculateOverall(
      draft.identity.position,
      draft.acquired,
      "basePotentialValue",
    );
    const potentialOverall = calculateOverall(
      draft.identity.position,
      draft.acquired,
      "potentialValue",
    );
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
              {STARTING_AGE} anos · {draft.identity.position} ·{" "}
              {NATIONALITIES[draft.identity.nationality]} ·{" "}
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
              <span>Herança</span>
              <strong>{naturalOverall}</strong>
            </div>
            <div>
              <span>Teto base</span>
              <strong>{basePotentialOverall}</strong>
            </div>
            <div>
              <span>Teto máximo</span>
              <strong>{potentialOverall}</strong>
            </div>
            <p>{determineArchetype(draft.identity.position, draft.acquired)}</p>
          </div>
        </section>
        <section className="result-grid">
          {attributes.map(({ key, label, shortLabel }) => {
            const value = draft.acquired[key]!;
            const sourceLabel =
              value.sourceRole && value.sourceRole !== "natural"
                ? ` · ${value.sourcePosition} → ${draft.identity.position}`
                : "";
            return (
              <article className="result-attribute" key={key}>
                <div>
                  <span>{shortLabel}</span>
                  <h3>{label}</h3>
                  <p>
                    de {value.sourcePlayerName}
                    {sourceLabel}
                  </p>
                </div>
                <div className="value-pair">
                  <strong>{value.currentValue}</strong>
                  <span>
                    herança {value.naturalCeiling} · base{" "}
                    {value.basePotentialValue} · máx. {value.potentialValue}
                  </span>
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

  if (!currentPlayer) return null;

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
            Atributo {selectedCount + 1} de {attributes.length}
          </span>
          <div>
            <i
              style={{ width: `${(selectedCount / attributes.length) * 100}%` }}
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
            {attributes.map(({ key, label, shortLabel }) => {
              const acquired = draft.acquired[key];
              return (
                <div className={`attribute-row ${acquired ? "filled" : ""}`} key={key}>
                  <span>{shortLabel}</span>
                  <div>
                    <strong>{label}</strong>
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
          {currentPlayer.sourceRole &&
            currentPlayer.sourceRole !== "natural" && (
              <p className="source-position-label">
                Improvisado · {currentPlayer.sourcePosition} →{" "}
                {draft.identity.position}
              </p>
            )}
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
            Você começa com 65–70% da nota. O teto absoluto fica entre 10–15%
            acima da fonte, mas ultrapassar a herança depende da carreira.
          </p>
          <div className="choice-list">
            {attributes.map(({ key, label, shortLabel }) => {
              const locked = Boolean(draft.acquired[key]);
              return (
                <button
                  key={key}
                  disabled={locked}
                  onClick={() => chooseAttribute(key)}
                >
                  <span>
                    <small>{shortLabel}</small>
                    <strong>{label}</strong>
                  </span>
                  {locked ? (
                    <em>Bloqueado</em>
                  ) : (
                    <b>{currentPlayer.attributes[key] ?? "—"}</b>
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
