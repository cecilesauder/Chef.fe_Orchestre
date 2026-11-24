/* ============================================================================
   js/exercise.js — Exercice de battue en temps réel (apprentissage du tempo)
   ============================================================================ */

const EXERCISE_HISTORY_KEY = "chef-orchestre.exercise-history.v1";

/**
 * Retourne l'historique des sessions d'exercice stocké dans localStorage.
 * @returns {Array} Tableau des sessions précédentes
 */
function getExerciseHistory() {
  try {
    const parsed = JSON.parse(localStorage.getItem(EXERCISE_HISTORY_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

/**
 * Affiche l'historique des sessions d'exercice dans la modale.
 */
function renderExerciseHistory() {
  const history = getExerciseHistory();
  if (!history.length) {
    refs.exerciseHistorySummary.textContent = "Aucune session enregistrée.";
    refs.exerciseHistoryList.innerHTML = '<div class="exercise-history-empty">Terminez un exercice pour créer votre premier repère.</div>';
    return;
  }

  const average = Math.round(history.reduce((sum, item) => sum + item.score, 0) / history.length);
  const best = Math.max(...history.map(item => item.best));
  refs.exerciseHistorySummary.textContent = `${history.length} session${history.length > 1 ? "s" : ""} • moyenne ${average}/100 • meilleur tap ${best}/100`;

  refs.exerciseHistoryList.innerHTML = history.slice(0, 12).map(item => {
    const date = new Date(item.date);
    const label = Number.isNaN(date.getTime()) ? "Session" : date.toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" });
    return `<div class="exercise-history-row"><span>${label} · ${item.attempts} taps</span><strong>${item.score}/100</strong><span>max ${item.best}</span></div>`;
  }).join("");
}

/**
 * Sauvegarde la session d'exercice actuelle dans localStorage.
 */
function saveExerciseSession() {
  if (exercise.sessionSaved || !exercise.attempts) return;
  const history = getExerciseHistory();
  history.unshift({
    date: new Date().toISOString(),
    score: Math.round(exercise.totalScore / exercise.attempts),
    best: exercise.bestScore,
    attempts: exercise.attempts,
    streak: exercise.bestStreak,
    bpm: Math.round(state.bpm * state.speed)
  });
  try {
    localStorage.setItem(EXERCISE_HISTORY_KEY, JSON.stringify(history.slice(0, 30)));
  } catch (error) {
    console.warn("Historique local indisponible.", error);
  }
  exercise.sessionSaved = true;
  renderExerciseHistory();
}

/**
 * Termine la session d'exercice en cours et sauvegarde le résultat.
 */
function finishExerciseSession() {
  if (!exercise.active) return;
  saveExerciseSession();
  exercise.active = false;
  updateExerciseUI();
}

/**
 * Met à jour l'interface de l'exercice (score, streak, état du bouton, feedback).
 */
function updateExerciseUI() {
  if (!exercise.attempts) {
    refs.exerciseScore.textContent = "—";
  } else {
    refs.exerciseScore.textContent = `${Math.round(exercise.totalScore / exercise.attempts)}/100`;
  }
  refs.exerciseBestScore.textContent = exercise.bestScore ? `${exercise.bestScore}` : "—";
  refs.exerciseStreak.textContent = exercise.streak;
  refs.exerciseTapBtn.disabled = !exercise.active;
  refs.exerciseTapBtn.classList.toggle("active", exercise.active);
  if (!exercise.active) {
    refs.exerciseTapBtn.classList.remove("on-time", "early", "late");
    refs.exerciseLiveFeedback.className = "exercise-live-feedback";
    refs.exerciseLiveFeedback.textContent = "—";
  }
  refs.startExerciseBtn.textContent = exercise.active ? "Arrêter l'exercice" : "Démarrer l'exercice";
}

/**
 * Démarre ou arrête une session d'exercice de battue.
 * Quand l'exercice démarre, le comptage de 4 temps prépare l'utilisateur.
 */
function startOrStopExercise() {
  if (exercise.active) {
    saveExerciseSession();
    exercise.active = false;
    refs.exerciseStatus.textContent = `Exercice arrêté — moyenne ${exercise.attempts ? Math.round(exercise.totalScore / exercise.attempts) : 0}/100.`;
    updateExerciseUI();
    return;
  }

  exercise.active = true;
  exercise.attempts = 0;
  exercise.totalScore = 0;
  exercise.streak = 0;
  exercise.sessionSaved = false;
  exercise.lastBeat = -1;

  const beatMs = 60000 / (state.bpm * state.speed);
  const untilNextBeat = state.isPlaying ? Math.max(80, (1 - state.beatProgress) * beatMs) : beatMs * 4;
  exercise.startAt = performance.now() + untilNextBeat;

  refs.exerciseStatus.textContent = state.isPlaying
    ? `Préparez-vous… premier battement dans ${Math.round(untilNextBeat)} ms.`
    : `Préparation de 4 temps… tempo cible : ${Math.round(state.bpm * state.speed)} BPM.`;

  if (!state.isPlaying) startPlayback();
  updateExerciseUI();
}
/**
 * Met à jour le feedback en temps réel de l'exercice de battue.
 * Appelé à chaque frame par animationLoop().
 * @param {number} now - Timestamp actuel (performance.now())
 */
function updateExerciseLiveFeedback(now) {
  if (!exercise.active) return;
  if (now < exercise.startAt) {
    refs.exerciseLiveFeedback.className = "exercise-live-feedback";
    refs.exerciseLiveFeedback.textContent = `Départ dans ${Math.max(0, ((exercise.startAt - now) / 1000)).toFixed(1)} s`;
    refs.exerciseTapBtn.classList.remove("on-time", "early", "late");
    return;
  }

  const beatMs = 60000 / (state.bpm * state.speed);
  const elapsed = now - exercise.startAt;
  const nearestBeat = Math.max(0, Math.round(elapsed / beatMs));
  const delta = now - (exercise.startAt + nearestBeat * beatMs);
  const absDelta = Math.abs(delta);
  const onTimeLimit = Math.max(35, beatMs * 0.08);
  const className = absDelta <= onTimeLimit ? "on-time" : (delta < 0 ? "early" : "late");
  const label = absDelta <= onTimeLimit
    ? "DANS LE TEMPO"
    : (delta < 0 ? `EN AVANCE ${Math.round(absDelta)} ms` : `EN RETARD ${Math.round(absDelta)} ms`);

  refs.exerciseLiveFeedback.className = `exercise-live-feedback ${className}`;
  refs.exerciseLiveFeedback.textContent = label;
  refs.exerciseTapBtn.classList.remove("on-time", "early", "late");
  refs.exerciseTapBtn.classList.add(className);
}

/**
 * Enregistre un tap de l'utilisateur pendant l'exercice.
 * Calcule l'écart par rapport au temps attendu et attribue un score.
 */
function scoreExerciseTap() {
  if (!exercise.active) return;
  const now = performance.now();
  if (now < exercise.startAt) {
    refs.exerciseStatus.textContent = `Attendez le départ… ${Math.ceil((exercise.startAt - now) / 1000)} s.`;
    return;
  }

  const beatMs = 60000 / (state.bpm * state.speed);
  const elapsed = now - exercise.startAt;
  const beatIndex = Math.max(0, Math.round(elapsed / beatMs));
  if (beatIndex <= exercise.lastBeat) return;

  const skipped = Math.max(0, beatIndex - exercise.lastBeat - 1);
  exercise.attempts += skipped;
  exercise.totalScore += 0;
  exercise.streak = 0;

  const expectedAt = exercise.startAt + beatIndex * beatMs;
  const errorMs = now - expectedAt;
  const absError = Math.abs(errorMs);
  const maxError = beatMs * 0.35;
  const score = Math.max(0, Math.round(100 * (1 - absError / maxError)));

  exercise.attempts += 1;
  exercise.totalScore += score;
  exercise.bestScore = Math.max(exercise.bestScore, score);
  exercise.streak = score >= 70 ? exercise.streak + 1 : 0;
  exercise.bestStreak = Math.max(exercise.bestStreak, exercise.streak);
  exercise.lastBeat = beatIndex;

  refs.exerciseLastError.textContent = `${errorMs >= 0 ? "+" : ""}${Math.round(errorMs)} ms`;
  refs.exerciseStatus.textContent = score >= 90
    ? `Excellent — ${score}/100 (${errorMs >= 0 ? "en retard" : "en avance"}).`
    : score >= 70
      ? `Bon geste — ${score}/100, resserrez légèrement le ${errorMs >= 0 ? "retard" : "avance"}.`
      : `À corriger — ${score}/100, écart de ${Math.round(absError)} ms.`;
  updateExerciseUI();
  updateExerciseLiveFeedback(performance.now());
}
