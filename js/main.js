/* ============================================================================
   js/main.js — Initialisation et event listeners
   ============================================================================ */

/**
 * Point d'entrée au chargement de la fenêtre.
 * Initialise les références DOM, rend l'interface et démarre la boucle d'animation.
 */
window.onload = function () {
  renderSectionPills();
  renderScoreList();
  renderOrchestraControls();
  renderOrchestraDesks();
  resizeCanvas();
  updateUI(false);
  requestAnimationFrame(animationLoop);
};

/* ============================================================================
   EVENT LISTENERS — Contrôle de lecture
   ============================================================================ */

// Les scripts sont chargés en bas du document : toutes les références DOM sont disponibles.
initDOMRefs();

// Bouton Play / Pause
refs.playPauseBtn.addEventListener("click", () => {
  if (state.isPlaying) pausePlayback();
  else startPlayback();
});

// Bouton Reset (retour mesure 1)
refs.resetBtn.addEventListener("click", () => resetPlayback());

// Raccourci clavier : Espace pour taper pendant l'exercice
document.addEventListener("keydown", (event) => {
  const target = event.target;
  const isTyping = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
  if (event.code === "Space" && !isTyping && exercise.active) {
    event.preventDefault();
    scoreExerciseTap();
  }
});

/* ============================================================================
   EVENT LISTENERS — Tempo, métronome, boucle, audio
   ============================================================================ */

// Sélecteur de vitesse (70% / 85% / 100%)
document.querySelectorAll(".speed-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".speed-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    state.speed = parseFloat(btn.dataset.speed);
    audioEngine.syncCustomAudio(state.currentMeasure, state.speed, state.isPlaying);
    updateUI(false);
  });
});

// Bouton Clic métronome ON/OFF
refs.metroBtn.addEventListener("click", () => {
  audioEngine.metronomeOn = !audioEngine.metronomeOn;
  refs.metroText.textContent = audioEngine.metronomeOn ? "ON" : "OFF";
  refs.metroBtn.classList.toggle("btn-toggle-on", audioEngine.metronomeOn);
});

// Bouton Boucle de section ON/OFF
refs.loopBtn.addEventListener("click", () => {
  state.loopSection = !state.loopSection;
  refs.loopText.textContent = state.loopSection ? "ON" : "OFF";
  refs.loopBtn.classList.toggle("btn-loop-on", state.loopSection);
  if (state.loopSection) {
    const sec = SECTIONS.find(s => state.currentMeasure >= s.start && state.currentMeasure <= s.end);
    if (sec) showToast(`Boucle activée : ${sec.label} à m.${sec.end}`);
  }
});

// Curseur de sélection de mesure
refs.measureSlider.addEventListener("input", (e) => {
  jumpToMeasure(parseInt(e.target.value, 10), false);
});

// Chargement de fichier audio personnalisé (MP3/WAV)
refs.audioFileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  audioEngine.loadCustomFile(file);
  refs.audioSourceLabel.textContent = file.name.slice(0, 12) + "…";
  refs.clearMp3Btn.classList.remove("hidden");
  refs.audioModeStatus.textContent = "● Audio MP3/WAV local";
  refs.audioModeStatus.style.color = "#a96873";
  showToast("Audio local chargé ! Appuyez sur Démarrer.");
});

// Bouton de test audio
refs.audioTestBtn.addEventListener("click", () => {
  if (audioEngine.playTestTone()) showToast("Signal test envoyé : vérifiez le volume et l'onglet.");
  else showToast("Le navigateur ne permet pas de produire le signal audio.");
});

// Bouton Effacer l'audio personnalisé
refs.clearMp3Btn.addEventListener("click", () => {
  audioEngine.clearCustomFile();
  refs.audioFileInput.value = "";
  refs.audioSourceLabel.textContent = "MP3/WAV";
  refs.clearMp3Btn.classList.add("hidden");
  refs.audioModeStatus.textContent = "● Synthé Orchestral ONM";
  refs.audioModeStatus.style.color = "#10b981";
  showToast("Retour au synthétiseur orchestral intégré.");
});
/* ============================================================================
   EVENT LISTENERS — Modales (Guide, Détail, Exercice)
   ============================================================================ */

// Modale Guide 4/4
refs.openGuideBtn.addEventListener("click", () => refs.guideModal.classList.remove("hidden"));
refs.closeGuideBtn.addEventListener("click", () => refs.guideModal.classList.add("hidden"));
refs.guideModal.addEventListener("click", (e) => {
  if (e.target === refs.guideModal) refs.guideModal.classList.add("hidden");
});

// Modale Détail de la mesure
refs.openDetailBtn.addEventListener("click", () => {
  renderDetailView();
  refs.detailModal.classList.remove("hidden");
});
refs.closeDetailBtn.addEventListener("click", () => refs.detailModal.classList.add("hidden"));
refs.detailModal.addEventListener("click", (e) => {
  if (e.target === refs.detailModal) refs.detailModal.classList.add("hidden");
});

// Modale Exercice de battue
refs.openExerciseBtn.addEventListener("click", () => {
  refs.exerciseModal.classList.remove("hidden");
  renderExerciseHistory();
  updateExerciseUI();
});
refs.closeExerciseBtn.addEventListener("click", () => {
  finishExerciseSession();
  refs.exerciseModal.classList.add("hidden");
});
refs.exerciseModal.addEventListener("click", (e) => {
  if (e.target === refs.exerciseModal) {
    finishExerciseSession();
    refs.exerciseModal.classList.add("hidden");
  }
});
refs.startExerciseBtn.addEventListener("click", startOrStopExercise);
refs.exerciseTapBtn.addEventListener("click", scoreExerciseTap);
refs.clearExerciseHistoryBtn.addEventListener("click", () => {
  localStorage.removeItem(EXERCISE_HISTORY_KEY);
  renderExerciseHistory();
  showToast("Historique des exercices effacé.");
});

/* ============================================================================
   EVENT LISTENERS — Simulation orchestre
   ============================================================================ */

// Bouton Lancer / Arrêter la simulation
refs.startSimulationBtn.addEventListener("click", startOrStopSimulation);

// Bouton Restaurer tous les pupitres
refs.restoreOrchestraBtn.addEventListener("click", () => {
  if (simulation.active) return;
  const restoredCount = ORCHESTRA_GROUPS.filter(group => group.active === false).length;
  if (!restoredCount) return;
  ORCHESTRA_GROUPS.forEach(group => { group.active = true; });
  simulation.message = "Tous les pupitres ont été rétablis.";
  renderOrchestraControls();
  renderOrchestraDesks();
  showToast("Tous les pupitres sont de nouveau présents.");
});
