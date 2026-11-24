/* ============================================================================
   js/playback.js — Contrôle de lecture, timing et synchronisation
   ============================================================================ */

/**
 * Démarre la lecture de la partition.
 * Gère le comptage préparatoire (levée) de 4 temps avant la mesure 1.
 */
function startPlayback() {
  if (state.isPlaying) return;

  // Réinitialiser le contexte audio si nécessaire
  audioEngine.init();

  const hasCustomAudio = audioEngine.hasCustomFile && audioEngine.customAudio;

  if (hasCustomAudio) {
    // Avec fichier audio externe : pas de comptage, on se cale sur l'audio
    state.isPlaying = true;
    state.isCountIn = false;
    state.currentMeasure = 1;
    state.currentBeat = 0;
    state.beatProgress = 0;
    state.ictusFlash = 0.3;

    audioEngine.syncCustomAudio(1, state.speed, true, true);
    triggerBeat(1, 0, false);
  } else {
    // Avec synthé intégré : comptage préparatoire de 4 temps
    state.isPlaying = true;
    state.isCountIn = true;
    state.countInBeat = 0;
    state.currentMeasure = 1;
    state.currentBeat = 0;
    state.beatProgress = 0;
    state.ictusFlash = 0.3;

    if (!state.loopSection) {
      audioEngine.playClick(0, true);
    }
  }

  updateUI(true);
}

/**
 * Met en pause la lecture en cours.
 */
function pausePlayback() {
  if (!state.isPlaying) return;
  state.isPlaying = false;

  const hasCustomAudio = audioEngine.hasCustomFile && audioEngine.customAudio;
  if (hasCustomAudio && !audioEngine.customAudio.paused) {
    audioEngine.customAudio.pause();
  }

  updateUI(false);
}

/**
 * Réinitialise la lecture à l'état initial (mesure 1, temps 0, arrêt).
 * @param {string} [message] - Message optionnel à afficher dans le toast
 */
function resetPlayback(message) {
  pausePlayback();
  state.isCountIn = false;
  state.countInBeat = 0;
  state.currentMeasure = 1;
  state.currentBeat = 0;
  state.beatProgress = 0;
  state.ictusFlash = 0;
  state.audioOffset = 0;

  const hasCustomAudio = audioEngine.hasCustomFile && audioEngine.customAudio;
  if (hasCustomAudio) {
    try {
      audioEngine.customAudio.currentTime = 0;
      audioEngine.customAudio.pause();
    } catch (error) {
      console.warn("Impossible de réinitialiser l'audio personnalisé.", error);
    }
  }

  updateUI(false);
  if (message) showToast(message);
}

/**
 * Saute à une mesure donnée et met à jour l'affichage.
 * @param {number} m - Numéro de mesure cible (1 à 62)
 * @param {boolean} [autoScroll] - Faut-il faire défiler la partition vers cette mesure
 */
function jumpToMeasure(m, autoScroll = false) {
  m = Math.max(1, Math.min(TOTAL_MEASURES, m));
  state.currentMeasure = m;
  state.currentBeat = 0;
  state.beatProgress = 0;
  state.ictusFlash = 0.3;

  const hasCustomAudio = audioEngine.hasCustomFile && audioEngine.customAudio;
  if (hasCustomAudio && audioEngine.customAudioReady) {
    const secPerMeasure = (60 / BASE_BPM) * 4;
    const targetTime = Math.max(0, (m - 1) * secPerMeasure);
    audioEngine.customAudio.currentTime = Math.min(targetTime, audioEngine.customAudio.duration);
    audioEngine.syncCustomAudio(m, state.speed, state.isPlaying, true);
  }

  triggerBeat(m, 0, false);
  updateUI(autoScroll);
}

/**
 * Déclenche les actions pour un temps donné (mesure, battement).
 * Joue le métronome et le son orchestral, fait flasher l'ictus visuel,
 * et met à jour l'interface si nécessaire.
 * @param {number} measure - Numéro de mesure
 * @param {number} beatIndex - Index du temps (0, 1, 2, 3)
 * @param {boolean} isCountIn - Clic pendant le comptage préparatoire
 */
function triggerBeat(measure, beatIndex, isCountIn) {
  state.ictusFlash = 0.3;

  if (state.isCountIn) {
    audioEngine.playClick(beatIndex, true);
  } else if (state.isPlaying) {
    audioEngine.playClick(beatIndex, false);
    audioEngine.playOrchestraBeat(measure, beatIndex, state.speed);
  }

  // Mettre à jour l'affichage uniquement sur le premier temps de chaque mesure
  if (beatIndex === 0) {
    updateUI(false);
  }

  // Mettre à jour la simulation des pupitres d'orchestre
  if (typeof updateSimulationPosition === "function") {
    updateSimulationPosition();
  }
}
/**
 * Met à jour l'interface utilisateur en fonction de l'état actuel.
 * Surligne la mesure active dans le conducteur, met à jour le prompteur,
 * la jauge de la main gauche, les badges de tempo, etc.
 * @param {boolean} [autoScroll] - Faut-il faire défiler la partition vers la mesure active
 */
function updateUI(autoScroll = false) {
  const m = state.currentMeasure;
  const mInfo = SCORE_DATA[m - 1];
  const bpmText = Math.round(state.bpm * state.speed);

  // Mise à jour du label de mesure et du curseur
  refs.scrubberLabel.textContent = m;
  refs.measureSlider.value = m;
  refs.bpmLabel.textContent = `${bpmText} BPM`;

  // Mise à jour du prompteur (main gauche)
  refs.prompterMeasure.textContent = `M. ${m}`;
  refs.dynamicBadge.textContent = mInfo.dyn;
  refs.lhGestureTitle.textContent = mInfo.lhTitle;
  refs.lhGestureDesc.textContent = mInfo.lhDesc;
  refs.lhGaugeFill.style.height = `${mInfo.lhLevel}%`;
  refs.lhGestureBadge.textContent = state.isCountIn ? "Levée" : mInfo.dyn;

  // Mise à jour du tag d'amplitude
  refs.ampTag.textContent = state.isCountIn ? "Amplitude : levée" : `Amplitude : ${mInfo.dyn}`;

  // Mise à jour des points de battement (canvas)
  refs.beatDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === (state.isCountIn ? state.countInBeat : state.currentBeat));
  });

  // Mise à jour du texte du bouton play/pause
  if (state.isPlaying) {
    refs.iconPlay.classList.add("hidden");
    refs.iconPause.classList.remove("hidden");
    refs.playBtnText.textContent = state.isCountIn ? "Levée en cours…" : "En lecture";
  } else {
    refs.iconPlay.classList.remove("hidden");
    refs.iconPause.classList.add("hidden");
    refs.playBtnText.textContent = "Démarrer (Levée)";
  }

  // Mise à jour du bouton de boucle
  refs.loopText.textContent = state.loopSection ? "ON" : "OFF";
  refs.loopBtn.classList.toggle("btn-loop-on", state.loopSection);

  // Mise à jour des boutons de vitesse
  refs.measureSlider.max = TOTAL_MEASURES;

  // Surlignage de la section active dans les pilules
  const activeSec = SECTIONS.find(s => m >= s.start && m <= s.end);
  document.querySelectorAll(".pill-btn").forEach(btn => {
    btn.classList.toggle("active", activeSec && btn.dataset.secId === activeSec.id);
  });

  // Surlignage de la ligne de mesure active dans le conducteur
  document.querySelectorAll(".measure-row.active-measure").forEach(el => el.classList.remove("active-measure"));
  const activeRow = document.getElementById(`m-row-${m}`);
  if (activeRow) {
    activeRow.classList.add("active-measure");
    if (autoScroll) {
      const targetScroll = activeRow.offsetTop - refs.scoreListContainer.offsetTop - (refs.scoreListContainer.clientHeight * 0.35);
      refs.scoreListContainer.scrollTo({
        top: Math.max(0, targetScroll),
        behavior: "smooth"
      });
    }
  }
}
/**
 * Met à jour l'état de lecture à partir du fichier audio personnalisé.
 * Lorsque l'audio externe est la source maître, c'est lui qui dicte la position musicale.
 * @returns {boolean} true si la position a été mise à jour depuis l'audio
 */
function updateStateFromCustomAudio() {
  const audio = audioEngine.customAudio;
  if (!audio || !audioEngine.customAudioReady || !Number.isFinite(audio.currentTime)) return false;

  const effectiveBpm = state.bpm * state.speed;
  const musicalSeconds = Math.max(0, audio.currentTime - state.audioOffset);
  const maxBeats = TOTAL_MEASURES * 4 - Number.EPSILON;
  const absoluteBeat = Math.min(maxBeats, musicalSeconds * effectiveBpm / 60);
  const nextMeasure = Math.floor(absoluteBeat / 4) + 1;
  const nextBeat = Math.floor(absoluteBeat % 4);
  const nextProgress = absoluteBeat % 1;
  const changed = nextMeasure !== state.currentMeasure || nextBeat !== state.currentBeat;

  state.isCountIn = false;
  state.currentMeasure = nextMeasure;
  state.currentBeat = nextBeat;
  state.beatProgress = nextProgress;
  if (changed) updateUI(nextBeat === 0);
  return true;
}

/**
 * Boucle d'animation principale (requestAnimationFrame).
 * Gère la progression des temps, le comptage préparatoire, la boucle de section,
 * et le dessin du canvas de battue.
 */
function animationLoop() {
  const now = performance.now();
  const dt = state.lastTime ? Math.min(0.1, Math.max(0, (now - state.lastTime) / 1000)) : 0;
  state.lastTime = now;

  // Décroissance du flash visuel de l'ictus
  if (state.ictusFlash > 0) {
    state.ictusFlash = Math.max(0, state.ictusFlash - dt * 2.8);
  }

  // Mise à jour du feedback de l'exercice de battue
  if (typeof updateExerciseLiveFeedback === "function") {
    updateExerciseLiveFeedback(now);
  }

  if (state.isPlaying) {
    const hasCustomAudio = audioEngine.hasCustomFile && audioEngine.customAudio;

    // Si l'audio externe a fini de jouer, arrêter la lecture
    if (hasCustomAudio && audioEngine.customAudio.ended) {
      if (typeof finishSimulation === "function") finishSimulation("Simulation arrêtée à la fin de l'enregistrement.");
      pausePlayback();
      showToast("Fin de l'audio personnalisé.");
    }
    // Si l'audio externe est en cours, c'est lui qui dicte la position
    else if (hasCustomAudio && !audioEngine.customAudio.paused && updateStateFromCustomAudio()) {
      // MP3 maître : la boucle interne ne modifie pas la position musicale
    }
    else {
      // Repli sur le synthé intégré ou pendant le chargement
      const beatDuration = (60 / state.bpm) / state.speed;
      state.beatProgress += dt / beatDuration;

      while (state.beatProgress >= 1.0 && state.isPlaying) {
        state.beatProgress -= 1.0;

        if (state.isCountIn) {
          state.countInBeat++;
          if (state.countInBeat >= 4) {
            state.isCountIn = false;
            state.currentMeasure = 1;
            state.currentBeat = 0;
            triggerBeat(1, 0, false);
          } else {
            triggerBeat(1, state.countInBeat, true);
          }
        } else {
          state.currentBeat++;
          if (state.currentBeat >= 4) {
            state.currentBeat = 0;

            // Gestion de la boucle sur la section active
            if (state.loopSection) {
              const activeSec = SECTIONS.find(s => state.currentMeasure >= s.start && state.currentMeasure <= s.end);
              if (activeSec && state.currentMeasure >= activeSec.end) {
                state.currentMeasure = activeSec.start;
                triggerBeat(state.currentMeasure, 0, false);
                continue;
              }
            }

            state.currentMeasure++;
            if (state.currentMeasure > TOTAL_MEASURES) {
              resetPlayback("Simulation terminée.");
              showToast("Fin de « The Hanging Tree » (Mesure 62) !");
              break;
            }
          }
          triggerBeat(state.currentMeasure, state.currentBeat, false);
        }
      }
    }
  }

  drawConductingCanvas();
  requestAnimationFrame(animationLoop);
}