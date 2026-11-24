/* ============================================================================
   js/audio.js — Moteur audio Web Audio API (synthé orchestral, métronome, MP3)
   ============================================================================ */

/**
 * Moteur audio de l'application.
 * Gère le synthétiseur orchestral (Web Audio API), le métronome,
 * et la synchronisation avec un fichier audio externe (MP3/WAV).
 */
class OrchestraAudioEngine {
  constructor() {
    /** Contexte audio Web Audio API */
    this.ctx = null;
    /** Métronome activé ou non */
    this.metronomeOn = true;
    /** Élément Audio pour fichier personnalisé */
    this.customAudio = null;
    /** URL objet du fichier personnalisé */
    this.customUrl = null;
    /** Un fichier personnalisé est-il chargé ? */
    this.hasCustomFile = false;
    /** Le fichier personnalisé est-il prêt ? */
    this.customAudioReady = false;
  }

  /**
   * Initialise le contexte AudioContext (à la première interaction utilisateur).
   * @returns {boolean} true si l'initialisation a réussi
   */
  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return false;
      try {
        this.ctx = new AudioCtx();
      } catch (error) {
        console.warn("Web Audio indisponible ; la partition et la baguette continuent sans son.", error);
        return false;
      }
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume().catch(error => {
        console.warn("Impossible de reprendre le contexte audio.", error);
      });
    }
    return true;
  }

  /**
   * Joue le clic du métronome pour un temps donné.
   * @param {number} beatIndex - Index du temps (0, 1, 2, 3)
   * @param {boolean} isCountIn - Clic pendant le comptage préparatoire
   */
  playClick(beatIndex, isCountIn) {
    if (!this.metronomeOn || !this.init()) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Temps 1 plus aigu (1040 Hz), temps 2-3-4 (740 Hz)
    osc.type = "triangle";
    osc.frequency.setValueAtTime(beatIndex === 0 ? 1040 : 740, now);

    const vol = isCountIn ? 0.28 : 0.16;
    gain.gain.setValueAtTime(vol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.065);
  }

  /**
   * Joue un son de test pour vérifier le fonctionnement audio.
   * @returns {boolean} true si le son a été lancé
   */
  playTestTone() {
    if (!this.init()) return false;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(880, now);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.21);
    return true;
  /**
   * Joue le son orchestral synthétique pour une mesure et un temps donnés.
   * Génère des nappes harmoniques, des percussions (timbales, grosse caisse, caisse claire)
   * selon la dynamique et la mesure de la partition.
   * @param {number} measure - Numéro de mesure (1 à 62)
   * @param {number} beatIndex - Index du temps (0, 1, 2, 3)
   * @param {number} speed - Multiplicateur de vitesse
   */
  playOrchestraBeat(measure, beatIndex, speed) {
    if (this.hasCustomFile || !this.init()) return;
    const now = this.ctx.currentTime;
    const beatDur = (60 / state.bpm) / speed;
    const mInfo = SCORE_DATA[measure - 1];
    const chord = getChordForMeasure(measure);

    // Volume selon nuance de la partition
    const ampGainMap = [0, 0.05, 0.09, 0.14, 0.20, 0.22];
    const baseVol = ampGainMap[mInfo.amp] || 0.09;

    // 1. Nappe harmonique sur le 1er temps de chaque mesure
    if (beatIndex === 0) {
      chord.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc.type = mInfo.amp >= 3 ? "sawtooth" : "sine";
        osc.frequency.setValueAtTime(freq, now);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(mInfo.amp >= 3 ? 1300 : 650, now);

        const noteVol = (baseVol / chord.length) * (idx === 0 ? 1.4 : 0.9);
        const dur = beatDur * 3.85;

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(noteVol, now + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + dur + 0.05);
      });
    }
    // 2. Timbales / Grosse Caisse à partir de la mesure 17
    if (measure >= 17 && (beatIndex === 0 || (measure >= 26 && beatIndex === 2))) {
      const drumOsc = this.ctx.createOscillator();
      const drumGain = this.ctx.createGain();
      drumOsc.type = "sine";
      drumOsc.frequency.setValueAtTime(115, now);
      drumOsc.frequency.exponentialRampToValueAtTime(42, now + 0.22);

      const drumVol = mInfo.amp >= 4 ? 0.32 : 0.20;
      drumGain.gain.setValueAtTime(drumVol, now);
      drumGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      drumOsc.connect(drumGain);
      drumGain.connect(this.ctx.destination);
      drumOsc.start(now);
      drumOsc.stop(now + 0.26);
    }

    // 3. Caisse claire martiale sur le Climax (m.51-60)
    if (measure >= 51 && measure <= 60 && (beatIndex === 1 || beatIndex === 3)) {
      const bufferSize = this.ctx.sampleRate * 0.12;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const hp = this.ctx.createBiquadFilter();
      hp.type = "highpass";
      hp.frequency.setValueAtTime(900, now);

      const snareGain = this.ctx.createGain();
      snareGain.gain.setValueAtTime(0.14, now);
      snareGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      noise.connect(hp);
      hp.connect(snareGain);
      snareGain.connect(this.ctx.destination);
      noise.start(now);
    }
  }
  /**
   * Charge un fichier audio personnalisé (MP3/WAV) pour lecture synchronisée.
   * @param {File} file - Fichier audio sélectionné par l'utilisateur
   */
  loadCustomFile(file) {
    if (this.customUrl) URL.revokeObjectURL(this.customUrl);
    this.customUrl = URL.createObjectURL(file);
    if (!this.customAudio) {
      this.customAudio = new Audio();
      this.customAudio.preload = "auto";
      this.customAudio.addEventListener("loadedmetadata", () => {
        this.customAudioReady = true;
      });
      this.customAudio.addEventListener("error", () => {
        this.customAudioReady = false;
        console.warn("Le fichier audio ne peut pas être décodé.");
      });
    }
    this.customAudioReady = false;
    this.customAudio.src = this.customUrl;
    this.customAudio.load();
    this.hasCustomFile = true;
  }

  /**
   * Nettoie et supprime le fichier audio personnalisé.
   */
  clearCustomFile() {
    if (this.customAudio) {
      this.customAudio.pause();
      try {
        this.customAudio.currentTime = 0;
      } catch (error) {
        console.warn("Impossible de remettre l'audio à zéro.", error);
      }
      this.customAudioReady = false;
    }
    if (this.customUrl) {
      URL.revokeObjectURL(this.customUrl);
      this.customUrl = null;
    }
    this.hasCustomFile = false;
  }

  /**
   * Synchronise le fichier audio personnalisé avec la position musicale actuelle.
   * @param {number} measure - Mesure courante
   * @param {number} speed - Multiplicateur de vitesse
   * @param {boolean} shouldPlay - Faut-il jouer ou mettre en pause
   * @param {boolean} forceSeek - Forcer le repositionnement du curseur de lecture
   */
  syncCustomAudio(measure, speed, shouldPlay, forceSeek = false) {
    if (!this.hasCustomFile || !this.customAudio) return;
    const secPerMeasure = (60 / BASE_BPM) * 4;
    const targetTime = Math.max(0, (measure - 1) * secPerMeasure);

    try {
      this.customAudio.playbackRate = (state.bpm * speed) / BASE_BPM;

      if (forceSeek && this.customAudioReady && Number.isFinite(this.customAudio.duration)) {
        this.customAudio.currentTime = Math.min(targetTime, this.customAudio.duration);
      }

      if (shouldPlay && this.customAudio.paused) {
        const playRequest = this.customAudio.play();
        if (playRequest && typeof playRequest.catch === "function") {
          playRequest.catch(error => {
            console.warn("La lecture MP3 est refusée, mais la battue continue.", error);
          });
        }
      } else if (!shouldPlay && !this.customAudio.paused) {
        this.customAudio.pause();
      }
    } catch (error) {
      console.warn("Synchronisation MP3 ignorée ; la battue continue.", error);
    }
  }
}

/** Instance unique du moteur audio */
const audioEngine = new OrchestraAudioEngine();
  }