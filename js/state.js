/* ============================================================================
   js/state.js — État global de l'application
   ============================================================================ */

/**
 * État global de l'application.
 * Contient toutes les variables mutables partagées entre les modules.
 */
const state = {
  /** Lecture en cours ou non */
  isPlaying: false,
  /** Comptage préparatoire (levée) en cours */
  isCountIn: false,
  /** Temps actuel du comptage (0, 1, 2, 3) */
  countInBeat: 0,
  /** Multiplicateur de vitesse (0.7, 0.85, 1.0) */
  speed: 1.0,
  /** Tempo actuel en BPM */
  bpm: 100,
  /** Offset audio pour synchronisation MP3 */
  audioOffset: 0,
  /** Boucle de section activée */
  loopSection: false,
  /** Mesure courante (1 à 62) */
  currentMeasure: 1,
  /** Battement courant (0, 1, 2, 3) */
  currentBeat: 0,
  /** Progression dans le battement actuel (0.0 à 1.0) */
  beatProgress: 0,
  /** Timestamp de la dernière frame */
  lastTime: 0,
  /** Intensité du flash visuel sur l'ictus */
  ictusFlash: 0
};

/**
 * État de l'exercice de battue en temps réel.
 */
const exercise = {
  active: false,
  startAt: 0,
  lastBeat: -1,
  attempts: 0,
  totalScore: 0,
  bestScore: 0,
  streak: 0,
  bestStreak: 0,
  sessionSaved: false
};

/**
 * État de la simulation des pupitres d'orchestre.
 */
const simulation = {
  active: false,
  cueIndex: 0,
  pendingCue: null,
  cues: [],
  hits: 0,
  misses: 0,
  errors: 0,
  finished: false,
  message: "La carte des entrées suit la mesure active du conducteur."
};