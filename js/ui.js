/* ============================================================================
   js/ui.js — Rendu de l'interface (pilules de section, liste des mesures, détail)
   ============================================================================ */

/**
 * Affiche les pilules de sélection rapide des sections dans le header.
 * Chaque pilule correspond à une section de l'œuvre (Intro, Couplet 2, etc.)
 */
function renderSectionPills() {
  const container = refs.sectionPillsRow;
  if (!container) return;
  container.innerHTML = "";

  SECTIONS.forEach(sec => {
    const btn = document.createElement("button");
    btn.className = "pill-btn";
    btn.dataset.secId = sec.id;
    btn.textContent = sec.label;
    btn.title = `Sauter à ${sec.label} (mesures ${sec.start}-${sec.end})`;
    btn.addEventListener("click", () => jumpToMeasure(sec.start, true));
    container.appendChild(btn);
  });
}

/**
 * Affiche la liste des 62 mesures dans le conducteur annoté.
 * Chaque mesure est une ligne cliquable permettant de sauter directement à celle-ci.
 */
function renderScoreList() {
  const container = refs.scoreListContainer;
  if (!container) return;
  container.innerHTML = "";

  SCORE_DATA.forEach(item => {
    const row = document.createElement("div");
    row.className = "measure-row";
    row.id = `m-row-${item.measure}`;
    row.innerHTML = `
      <div class="m-num-badge">${item.measure}</div>
      <div class="m-content">
        <div class="m-top-line">
          <span class="m-section-tag">${item.section}</span>
          <span class="m-dyn-tag">${item.dyn}</span>
          ${item.lyrics ? `<span class="m-lyrics">${item.lyrics}</span>` : ""}
        </div>
        <div class="m-action">${item.action}</div>
        <div class="m-instruments">${item.instruments}</div>
      </div>
    `;
    row.addEventListener("click", () => {
      jumpToMeasure(item.measure, true);
    });
    container.appendChild(row);
  });
}

/**
 * Affiche la vue détaillée de la mesure actuelle dans la modale détaillée.
 * Remplit tous les champs : titre, nuance, action, instruments, geste, etc.
 */
function renderDetailView() {
  const m = state.currentMeasure;
  const mInfo = SCORE_DATA[m - 1];
  const normalizedDyn = mInfo.dyn.toLowerCase().split(/\s|\/|→|</)[0];
  const intensity = { ppp: 12, pp: 20, p: 30, mp: 42, mf: 55, f: 70, ff: 84, fff: 100 }[normalizedDyn] || 45;

  const nuanceText = {
    ppp: "Très retenu : geste petit, calme et proche du corps.",
    pp: "Très doux : garder de l'espace et éviter toute pression.",
    p: "Doux : donner une impulsion claire sans élargir inutilement.",
    mp: "Modéré : geste souple, stable et respiré.",
    mf: "Assez soutenu : ouvrir progressivement le geste et porter la phrase.",
    f: "Fort : geste ample et énergique, soutien fort du corps.",
    ff: "Très fort : battue large, puissance maximale, engagement total.",
    fff: "Fortissimo absolu : geste très large, explosion sonore."
  };

  refs.detailMeasureTitle.textContent = `Mesure ${m}`;
  refs.detailSectionText.textContent = `${mInfo.section} • ${mInfo.dyn}`;
  refs.detailDynValue.textContent = mInfo.dyn;
  refs.detailDynFill.style.width = `${intensity}%`;
  refs.detailNuanceText.textContent = nuanceText[normalizedDyn] || "—";
  refs.detailActionText.textContent = mInfo.action;
  refs.detailInstrumentsText.textContent = mInfo.instruments;

  // Geste de la main gauche
  refs.detailGestureTitle.textContent = mInfo.lhTitle;
  refs.detailGestureDesc.textContent = mInfo.lhDesc;

  // Icône de main selon l'amplitude
  const handIcons = { 1: "✊", 2: "☝", 3: "🖐", 4: "👐", 5: "🛑" };
  refs.detailHandIcon.textContent = handIcons[mInfo.amp] || "🖐";

  // Cue associé si présent
  const cue = ANNOTATED_CUES.find(c => c.measure === m);
  if (cue) {
    refs.detailCueText.innerHTML = `<strong>${cue.label}</strong>`;
    refs.detailCueText.style.display = "block";
  } else {
    refs.detailCueText.style.display = "none";
  }

  // Tempo et mesure suivante
  refs.detailTempoText.textContent = `${Math.round(state.bpm * state.speed)} BPM • 4/4`;

  const nextM = m < TOTAL_MEASURES ? SCORE_DATA[m] : null;
  if (nextM) {
    const nextCue = ANNOTATED_CUES.find(c => c.measure === m + 1);
    refs.detailNextText.textContent = nextCue
      ? `Mes. ${m + 1} : ${nextCue.label}`
      : `Mes. ${m + 1} : ${nextM.action}`;
  } else {
    refs.detailNextText.textContent = "Fin de l'œuvre (mesure 62).";
  }
}