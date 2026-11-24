/* ============================================================================
   js/simulation.js — Simulation des pupitres d'orchestre (répétition)
   ============================================================================ */

/**
 * Met à jour l'affichage du nombre de pupitres présents et l'état du bouton de restauration.
 */
function renderOrchestraControls() {
  const absentCount = ORCHESTRA_GROUPS.filter(group => group.active === false).length;
  refs.orchestraPresenceCount.textContent = `${ORCHESTRA_GROUPS.length - absentCount}/${ORCHESTRA_GROUPS.length} présents`;
  refs.restoreOrchestraBtn.disabled = simulation.active || absentCount === 0;
  refs.orchestraTrashZone.classList.toggle("is-disabled", simulation.active);
  refs.orchestraTrashZone.setAttribute("aria-disabled", String(simulation.active));
}

/**
 * Retire un pupitre de l'effectif actif (marque comme absent).
 * @param {Object} group - Objet pupitre à retirer
 */
function removeOrchestraGroup(group) {
  if (simulation.active || group.active === false) return;
  group.active = false;
  simulation.message = `${group.name} retiré·e de l'effectif.`;
  renderOrchestraControls();
  renderOrchestraDesks();
  showToast(`${group.name} retiré·e — utilisez le bouton de restauration pour tout rétablir.`);
}

/**
 * Vérifie si un événement pointer est au-dessus de la corbeille.
 * @param {PointerEvent} event
 * @returns {boolean}
 */
function isPointerOverTrash(event) {
  const bounds = refs.orchestraTrashZone.getBoundingClientRect();
  return event.clientX >= bounds.left && event.clientX <= bounds.right &&
    event.clientY >= bounds.top && event.clientY <= bounds.bottom;
}

/**
 * Retourne l'objet pupitre correspondant à un identifiant.
 * @param {string} groupId - ID du pupitre
 * @returns {Object|undefined}
 */
function getOrchestraGroup(groupId) {
  return ORCHESTRA_GROUPS.find(group => group.id === groupId);
}

/**
 * Calcule le rang d'un cue (position dans le temps en battements).
 * @param {Object} cue - Objet cue avec measure et beat
 * @returns {number} Rang (mesure * 4 + beat)
 */
function getCueRank(cue) {
  return (cue.measure - 1) * 4 + cue.beat;
}

/**
 * Calcule la position horlogère d'un pupitre sur le plan de l'orchestre.
 * @param {Object} group - Objet pupitre avec x et y
 * @returns {string} Position sous forme "h h30" (ex: "3 h", "4 h30")
 */
function getGroupClockPosition(group) {
  const degrees = (Math.atan2(group.x - 400, 455 - group.y) * 180 / Math.PI + 360) % 360;
  const halfHours = Math.round(degrees / 15) % 24;
  const hour = Math.floor(halfHours / 2) || 12;
  return `${hour} h${halfHours % 2 ? " 30" : ""}`;
}

/**
 * Rend les pupitres d'orchestre sur le plan SVG.
 * Crée un élément <g> par pupitre avec gestion du drag & drop, du clic et du clavier.
 */
function renderOrchestraDesks() {
  refs.orchestraDesksLayer.innerHTML = "";

  ORCHESTRA_GROUPS.forEach(group => {
    if (group.active === false) return;

    const desk = document.createElementNS("http://www.w3.org/2000/svg", "g");
    desk.setAttribute("class", "desk-node");
    desk.setAttribute("transform", `translate(${group.x}, ${group.y}) rotate(${group.angle || 0})`);
    desk.setAttribute("tabindex", "0");
    desk.setAttribute("role", "button");
    desk.setAttribute("aria-label", `${group.name}, présent, ${getGroupClockPosition(group)}. Appuyez sur Suppr pour retirer ce pupitre.`);
    desk.dataset.groupId = group.id;

    // Rectangle du pupitre
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", -group.w / 2);
    rect.setAttribute("y", -22);
    rect.setAttribute("width", group.w);
    rect.setAttribute("height", 44);
    rect.setAttribute("rx", 8);
    rect.setAttribute("fill", group.color);
    rect.setAttribute("fill-opacity", ".28");
    rect.setAttribute("stroke", group.color);
    rect.setAttribute("stroke-width", "2");

    // Nom du pupitre
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", 0);
    text.setAttribute("y", 4);
    text.setAttribute("fill", "#f8fafc");
    text.setAttribute("font-size", "14");
    text.setAttribute("font-weight", "700");
    text.setAttribute("text-anchor", "middle");
    text.textContent = group.label;
    desk.append(rect, text);

    // Indicateur de statut (cercle + lettre)
    const statusIcon = document.createElementNS("http://www.w3.org/2000/svg", "g");
    statusIcon.setAttribute("class", "desk-status-icon");
    const statusCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    statusCircle.setAttribute("cx", -group.w / 2 + 11);
    statusCircle.setAttribute("cy", -12);
    statusCircle.setAttribute("r", "7");
    const statusText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    statusText.setAttribute("x", -group.w / 2 + 11);
    statusText.setAttribute("y", -9);
    statusText.setAttribute("text-anchor", "middle");
    statusIcon.append(statusCircle, statusText);
    desk.appendChild(statusIcon);

    // --- Gestion du drag & drop ---
    let drag = null;
    desk.addEventListener("pointerdown", event => {
      if (group.active === false || simulation.active) return;
      event.preventDefault();
      drag = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        originX: group.x,
        originY: group.y,
        moved: false
      };
      desk.setPointerCapture(event.pointerId);
    });

    desk.addEventListener("pointermove", event => {
      if (!drag || drag.pointerId !== event.pointerId) return;
      const bounds = refs.orchestraSvg.getBoundingClientRect();
      const dx = (event.clientX - drag.startX) * 800 / bounds.width;
      const dy = (event.clientY - drag.startY) * 510 / bounds.height;
      if (Math.abs(dx) + Math.abs(dy) > 4) drag.moved = true;
      refs.orchestraTrashZone.classList.toggle("is-drop-target", drag.moved && isPointerOverTrash(event));
      if (drag.moved) {
        group.x = Math.max(75, Math.min(725, drag.originX + dx));
        group.y = Math.max(80, Math.min(410, drag.originY + dy));
        desk.setAttribute("transform", `translate(${group.x}, ${group.y}) rotate(${group.angle || 0})`);
      }
    });

    desk.addEventListener("pointerup", event => {
      if (!drag) {
        if (simulation.active) handleOrchestraGroupTap(group);
        return;
      }
      if (drag.pointerId !== event.pointerId) return;
      const moved = drag.moved;
      const droppedInTrash = moved && isPointerOverTrash(event);
      drag = null;
      refs.orchestraTrashZone.classList.remove("is-drop-target");
      if (droppedInTrash) {
        removeOrchestraGroup(group);
        return;
      }
      if (moved) {
        desk.setAttribute("aria-label", `${group.name}, présent, ${getGroupClockPosition(group)}`);
        simulation.message = `${group.name} placé·e vers ${getGroupClockPosition(group)}.`;
        updateSimulationUI();
      } else {
        handleOrchestraGroupTap(group);
      }
    });

    desk.addEventListener("pointercancel", () => {
      drag = null;
      refs.orchestraTrashZone.classList.remove("is-drop-target");
    });

    desk.addEventListener("click", event => {
      if (event.detail === 0 && group.active !== false) handleOrchestraGroupTap(group);
    });

    desk.addEventListener("keydown", event => {
      if (group.active !== false && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        handleOrchestraGroupTap(group);
      } else if (!simulation.active && (event.key === "Delete" || event.key === "Backspace")) {
        event.preventDefault();
        removeOrchestraGroup(group);
      }
    });

    refs.orchestraDesksLayer.appendChild(desk);
  });
  updateSimulationUI();
}
/**
 * Met à jour l'interface de la simulation (compteurs, messages, états des pupitres).
 * Appelé à chaque changement de mesure ou de temps pendant la simulation.
 * @param {string} [message] - Message optionnel à afficher
 */
function updateSimulationUI(message) {
  if (message) simulation.message = message;

  refs.simulationHits.textContent = simulation.hits;
  refs.simulationMisses.textContent = simulation.misses;
  refs.simulationErrors.textContent = simulation.errors;
  refs.simulationMeasure.textContent = simulation.active
    ? `M. ${state.currentMeasure} • ${state.currentBeat + 1}/4`
    : "—";
  refs.simulationTempo.textContent = `${Math.round(state.bpm * state.speed)} BPM`;
  refs.simulationDynamic.textContent = SCORE_DATA[state.currentMeasure - 1].dyn;
  refs.startSimulationBtn.textContent = simulation.active ? "Arrêter la simulation" : "Lancer la simulation";
  refs.simulationInstructions.textContent = simulation.active
    ? "Les pupitres dorés sont annoncés jusqu'à une mesure avant leur entrée. Touchez-les avant le départ ; les absents sont exclus du score."
    : "Les états suivent chaque mesure de la partition ; lancez la répétition pour vous entraîner aux appels signalés. Les absents sont exclus du score.";

  const currentRank = (state.currentMeasure - 1) * 4 + state.currentBeat;
  const stateCounts = { playing: 0, silent: 0, cued: 0, absent: 0 };

  refs.orchestraDesksLayer.querySelectorAll(".desk-node").forEach(desk => {
    const group = getOrchestraGroup(desk.dataset.groupId);
    const groupIsPending = Boolean(
      simulation.pendingCue &&
      simulation.pendingCue.groups.includes(group.id) &&
      !simulation.pendingCue.hitGroups.includes(group.id)
    );

    const measureCue = !simulation.active && !simulation.finished && SIMULATION_CUES.some(cue => {
      const beatsUntilCue = getCueRank(cue) - currentRank;
      return cue.groups.includes(group.id) && beatsUntilCue >= 0 &&
        beatsUntilCue <= CUE_NOTICE_LEAD_BEATS;
    });

    const scoreIsActive = isGroupPlayingInMeasure(group, state.currentMeasure);

    const status = group.active === false
      ? "absent"
      : groupIsPending || measureCue
        ? "cued"
        : scoreIsActive ? "playing" : "silent";

    const statusLabels = {
      absent: "absent",
      cued: "à appeler",
      playing: "joue dans cette mesure",
      silent: "silence sur toute la mesure"
    };
    const statusSymbols = { absent: "×", cued: "!", playing: "♪", silent: "—" };

    desk.classList.remove("is-absent", "is-playing", "is-silent", "is-cued");
    desk.classList.add(`is-${status}`);
    desk.setAttribute("aria-label", `${group.name}, ${statusLabels[status]}. Appuyez sur Suppr pour retirer ce pupitre.`);
    desk.querySelector(".desk-status-icon text").textContent = statusSymbols[status];
    stateCounts[status]++;
  });

  if (simulation.active && state.isCountIn) {
    refs.orchestraInfo.textContent = `Comptage préparatoire ${state.countInBeat + 1}/4 — les appels arrivent après la levée.`;
  } else if (simulation.active && simulation.pendingCue) {
    const cue = simulation.pendingCue;
    const remaining = cue.groups
      .filter(groupId => !cue.hitGroups.includes(groupId))
      .map(groupId => getOrchestraGroup(groupId).name);
    const beatsUntilCue = Math.max(0, cue.rank - currentRank);
    const timing = beatsUntilCue === 0 ? "maintenant" : `dans ${beatsUntilCue} temps`;
    const prompt = `À préparer ${timing} — ${cue.label} : ${remaining.join(", ")}.`;
    refs.orchestraInfo.textContent = simulation.message.startsWith("Trop tôt")
      ? `${simulation.message} ${prompt}`
      : prompt;
  } else {
    if (!simulation.finished) {
      const upcomingCue = SIMULATION_CUES.find(cue =>
        getCueRank(cue) >= currentRank &&
        cue.groups.some(groupId => getOrchestraGroup(groupId).active !== false)
      );
      const beatsUntilCue = upcomingCue ? getCueRank(upcomingCue) - currentRank : null;
      const cueNames = upcomingCue
        ? upcomingCue.groups
          .filter(groupId => getOrchestraGroup(groupId).active !== false)
          .map(groupId => getOrchestraGroup(groupId).name)
        : [];
      const counts = `${stateCounts.playing} en jeu · ${stateCounts.silent} silencieux · ${stateCounts.cued} à appeler`;
      const cueMessage = cueNames.length && beatsUntilCue <= CUE_NOTICE_LEAD_BEATS
        ? ` ${beatsUntilCue === 0 ? "Départ à donner maintenant" : `À préparer dans ${beatsUntilCue} temps`}: ${cueNames.join(", ")}.`
        : "";
      refs.orchestraInfo.textContent = `Mesure ${state.currentMeasure} — ${counts}.${cueMessage}`;
    } else {
      refs.orchestraInfo.textContent = simulation.message;
    }
  }
}
/**
 * Met à jour la position de la simulation par rapport aux cues.
 * Détecte quand un cue doit devenir "pending" (à préparer) et quand il est manqué.
 * Appelé à chaque temps pendant la lecture.
 */
function updateSimulationPosition() {
  if (!simulation.active || state.isCountIn) {
    updateSimulationUI();
    return;
  }

  const rank = (state.currentMeasure - 1) * 4 + state.currentBeat;

  // Vérifier si le cue pending actuel est dépassé (manqué)
  if (simulation.pendingCue && rank >= simulation.pendingCue.rank) {
    const missed = simulation.pendingCue.groups.length - simulation.pendingCue.hitGroups.length;
    simulation.misses += missed;
    simulation.message = missed
      ? `Trop tard pour « ${simulation.pendingCue.label} » : ${missed} départ${missed > 1 ? "s" : ""} oublié${missed > 1 ? "s" : ""}.`
      : `Départ donné : ${simulation.pendingCue.label}.`;
    simulation.pendingCue = null;
    simulation.cueIndex++;
  }

  // Détecter le prochain cue à préparer (dans la fenêtre d'avance)
  const cue = simulation.cues[simulation.cueIndex];
  const cueRank = cue ? getCueRank(cue) : null;
  if (!simulation.pendingCue && cue && rank < cueRank &&
    rank >= Math.max(0, cueRank - CUE_NOTICE_LEAD_BEATS)) {
    simulation.pendingCue = {
      ...cue,
      rank: cueRank,
      hitGroups: []
    };
    simulation.message = `Préparez le départ : ${cue.label}.`;
  }
  updateSimulationUI();
}

/**
 * Gère le tap (clic) sur un pupitre pendant la simulation.
 * Valide si le pupitre est appelé au bon moment et met à jour le score.
 * @param {Object} group - Pupitre tapé par l'utilisateur
 */
function handleOrchestraGroupTap(group) {
  if (group.active === false) return;

  if (!simulation.active) {
    refs.orchestraInfo.textContent = `${group.name} • ${group.family} • ${getGroupClockPosition(group)}. Faites glisser ce pupitre pour modifier son placement.`;
    return;
  }

  const pending = simulation.pendingCue;
  if (!pending || !pending.groups.includes(group.id) || pending.hitGroups.includes(group.id)) {
    simulation.errors++;
    simulation.message = pending
      ? `Trop tôt : le départ attendu concerne ${pending.groups.map(id => getOrchestraGroup(id).name).join(", ")}.`
      : "Aucun départ à donner maintenant : restez attentif·ve au conducteur.";
    updateSimulationUI();
    return;
  }

  pending.hitGroups.push(group.id);
  simulation.hits++;
  if (pending.hitGroups.length === pending.groups.length) {
    simulation.message = `Départ donné à temps : ${pending.label}.`;
    simulation.pendingCue = null;
    simulation.cueIndex++;
  }
  updateSimulationUI();
}

/**
 * Termine la simulation et affiche le résultat final.
 * @param {string} message - Message de fin à afficher
 */
function finishSimulation(message) {
  if (!simulation.active) return;
  simulation.active = false;
  simulation.finished = true;
  simulation.pendingCue = null;
  const expected = simulation.cues.reduce((total, cue) => total + cue.groups.length, 0);
  const accuracy = expected ? Math.round(simulation.hits / expected * 100) : 0;
  simulation.message = `${message} Réussite : ${simulation.hits}/${expected} départs (${accuracy} %), ${simulation.misses} oubliés et ${simulation.errors} erreurs.`;
  updateSimulationUI();
  renderOrchestraControls();
}
/**
 * Démarre ou arrête la simulation des entrées de pupitres d'orchestre.
 * Pendant la simulation, l'utilisateur doit taper sur les pupitres au moment de leur entrée.
 */
function startOrStopSimulation() {
  if (simulation.active) {
    finishSimulation("Simulation arrêtée.");
    return;
  }

  simulation.active = true;
  simulation.finished = false;
  simulation.cueIndex = 0;
  simulation.pendingCue = null;
  simulation.hits = 0;
  simulation.misses = 0;
  simulation.errors = 0;
  simulation.message = "Simulation démarrée. Attendez les appels de pupitres.";
  simulation.cues = SIMULATION_CUES;

  renderOrchestraControls();
  renderOrchestraDesks();
  updateSimulationUI();
  showToast("Simulation démarrée — soyez prêt à appeler les pupitres !");
}
