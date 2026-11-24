/* ============================================================================
   js/refs.js — Références DOM et utilitaires d'interface
   ============================================================================ */

/**
 * Références DOM vers les éléments de l'interface.
 * Toutes initialisées après le chargement du DOM via initDOMRefs().
 */
const refs = {};

/**
 * Initialise toutes les références DOM utilisées par l'application.
 * À appeler une fois après le chargement de la page.
 */
function initDOMRefs() {
  // Transport
  refs.playPauseBtn = document.getElementById("playPauseBtn");
  refs.iconPlay = document.getElementById("iconPlay");
  refs.iconPause = document.getElementById("iconPause");
  refs.playBtnText = document.getElementById("playBtnText");
  refs.resetBtn = document.getElementById("resetBtn");
  refs.metroBtn = document.getElementById("metroBtn");
  refs.metroText = document.getElementById("metroText");
  refs.loopBtn = document.getElementById("loopBtn");
  refs.loopText = document.getElementById("loopText");

  // Audio
  refs.audioFileInput = document.getElementById("audioFileInput");
  refs.audioSourceLabel = document.getElementById("audioSourceLabel");
  refs.clearMp3Btn = document.getElementById("clearMp3Btn");
  refs.audioModeStatus = document.getElementById("audioModeStatus");
  refs.audioTestBtn = document.getElementById("audioTestBtn");
  // Navigation
  refs.measureSlider = document.getElementById("measureSlider");
  refs.scrubberLabel = document.getElementById("scrubberLabel");
  refs.bpmLabel = document.getElementById("bpmLabel");
  refs.sectionPillsRow = document.getElementById("sectionPillsRow");
  refs.scoreListContainer = document.getElementById("scoreListContainer");

  // Canvas / main droite
  refs.canvas = document.getElementById("conductingCanvas");
  refs.canvasBox = document.getElementById("canvasBox");
  refs.beatDots = document.querySelectorAll(".beat-dot");
  refs.rightHandMode = document.getElementById("rightHandMode");
  refs.ampTag = document.getElementById("ampTag");
  refs.countInOverlay = document.getElementById("countInOverlay");
  refs.countInNum = document.getElementById("countInNum");
  refs.countInHint = document.getElementById("countInHint");

  // Prompteur / main gauche
  refs.dynamicBadge = document.getElementById("dynamicBadge");
  refs.openDetailBtn = document.getElementById("openDetailBtn");
  refs.openExerciseBtn = document.getElementById("openExerciseBtn");
  refs.lhGaugeFill = document.getElementById("lhGaugeFill");
  refs.lhGestureTitle = document.getElementById("lhGestureTitle");
  refs.lhGestureDesc = document.getElementById("lhGestureDesc");
  refs.prompterMeasure = document.getElementById("prompterMeasure");
  refs.nextCueChip = document.getElementById("nextCueChip");
  refs.actionNowText = document.getElementById("actionNowText");
  refs.nextCueText = document.getElementById("nextCueText");
  // Modales
  refs.guideModal = document.getElementById("guideModal");
  refs.openGuideBtn = document.getElementById("openGuideBtn");
  refs.closeGuideBtn = document.getElementById("closeGuideBtn");
  refs.detailModal = document.getElementById("detailModal");
  refs.closeDetailBtn = document.getElementById("closeDetailBtn");
  refs.detailMeasureTitle = document.getElementById("detailMeasureTitle");
  refs.detailSectionText = document.getElementById("detailSectionText");
  refs.detailDynValue = document.getElementById("detailDynValue");
  refs.detailDynFill = document.getElementById("detailDynFill");
  refs.detailNuanceText = document.getElementById("detailNuanceText");
  refs.detailActionText = document.getElementById("detailActionText");
  refs.detailGestureTitle = document.getElementById("detailGestureTitle");
  refs.detailGestureDesc = document.getElementById("detailGestureDesc");
  refs.detailHandIcon = document.getElementById("detailHandIcon");
  refs.detailCueText = document.getElementById("detailCueText");
  refs.detailInstrumentsText = document.getElementById("detailInstrumentsText");
  refs.detailNextText = document.getElementById("detailNextText");
  refs.detailTempoText = document.getElementById("detailTempoText");
  refs.exerciseModal = document.getElementById("exerciseModal");
  refs.closeExerciseBtn = document.getElementById("closeExerciseBtn");
  refs.startExerciseBtn = document.getElementById("startExerciseBtn");
  refs.exerciseTapBtn = document.getElementById("exerciseTapBtn");
  refs.exerciseScore = document.getElementById("exerciseScore");
  refs.exerciseStatus = document.getElementById("exerciseStatus");
  refs.exerciseLiveFeedback = document.getElementById("exerciseLiveFeedback");
  refs.exerciseLastError = document.getElementById("exerciseLastError");
  refs.exerciseBestScore = document.getElementById("exerciseBestScore");
  refs.exerciseStreak = document.getElementById("exerciseStreak");
  refs.clearExerciseHistoryBtn = document.getElementById("clearExerciseHistoryBtn");
  refs.exerciseHistorySummary = document.getElementById("exerciseHistorySummary");
  refs.exerciseHistoryList = document.getElementById("exerciseHistoryList");

  // Orchestre
  refs.orchestraSvg = document.getElementById("orchestraSvg");
  refs.orchestraTrashZone = document.getElementById("orchestraTrashZone");
  refs.orchestraPresenceCount = document.getElementById("orchestraPresenceCount");
  refs.restoreOrchestraBtn = document.getElementById("restoreOrchestraBtn");
  refs.orchestraDesksLayer = document.getElementById("orchestraDesksLayer");
  refs.orchestraInfo = document.getElementById("orchestraInfo");
  refs.simulationInstructions = document.getElementById("simulationInstructions");
  refs.startSimulationBtn = document.getElementById("startSimulationBtn");
  refs.simulationHits = document.getElementById("simulationHits");
  refs.simulationMisses = document.getElementById("simulationMisses");
  refs.simulationErrors = document.getElementById("simulationErrors");
  refs.simulationMeasure = document.getElementById("simulationMeasure");
  refs.simulationTempo = document.getElementById("simulationTempo");
  refs.simulationDynamic = document.getElementById("simulationDynamic");

  // Toast
  refs.toastMsg = document.getElementById("toastMsg");

  // Canvas 2D context
  refs.ctx = refs.canvas.getContext("2d");
}
/**
 * Affiche une notification toast temporaire en bas de l'écran.
 * @param {string} msg - Message à afficher
 */
function showToast(msg) {
  refs.toastMsg.textContent = msg;
  refs.toastMsg.classList.remove("hidden");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => refs.toastMsg.classList.add("hidden"), 2600);
}
let toastTimer = null;