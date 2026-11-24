/* ============================================================================
   js/data.js — Données de la partition "The Hanging Tree" (arr. J. Penin)
   ============================================================================ */

/** Nombre total de mesures de l'œuvre */
const TOTAL_MEASURES = 62;

/** Tempo de référence en BPM */
const BASE_BPM = 100;

/** Nombre de temps d'avance pour l'annonce d'un pupitre (en battements) */
const CUE_NOTICE_LEAD_BEATS = 4;

/**
 * Sections de l'œuvre avec leur plage de mesures.
 * Utilisé pour la navigation rapide et le surlignage des pilules.
 */
const SECTIONS = [
  { id: "s1", label: "Intro/C1 (m.1)", start: 1, end: 8 },
  { id: "s2", label: "C2 (m.9)", start: 9, end: 16 },
  { id: "s3", label: "Timbales (m.17)", start: 17, end: 24 },
  { id: "s4", label: "Tutti ff (m.25)", start: 25, end: 33 },
  { id: "s5", label: "Pont (m.34)", start: 34, end: 40 },
  { id: "s6", label: "Voix Ah (m.41)", start: 41, end: 47 },
  { id: "s7", label: "Montée (m.48)", start: 48, end: 50 },
  { id: "s8", label: "Climax fff (m.51)", start: 51, end: 57 },
  { id: "s9", label: "Final (m.58)", start: 58, end: 62 }
];

/**
 * Cues majeurs annotés dans la partition.
 * Utilisé pour afficher des informations contextuelles dans le prompteur.
 */
const MAJOR_CUES = [
  { measure: 6, text: "Mes. 6 : Entrée Hautbois, Clar. 1 & Basson (p/pp)" },
  { measure: 9, text: "Mes. 9 : Couplet 2 (mp) + crescendo sur « in the hanging tree »" },
  { measure: 14, text: "Mes. 14 : Entrée Flûte 1 (p) & Hautbois (mp)" },
  { measure: 17, text: "Mes. 17 : Point d'orgue (t.2) + Timbales & Grosse Caisse (f) !" },
  { measure: 18, text: "Mes. 18 : Entrée Piccolo, Cors, Tpt 2 & crescendo vers f" },
  { measure: 25, text: "Mes. 25 : Roulement Timbales/Cymbale -> Explosion TUTTI (ff) !" },
  { measure: 34, text: "Mes. 34 : Pont instrumental (f) + trait rapide Piccolo/Sax Sop." },
  { measure: 41, text: "Mes. 41 : Entrée Chœur « Ah » (mf) + Flûtes/Piccolo (ff)" },
  { measure: 48, text: "Mes. 48 : Grande montée p < fff sur 3 mesures (m.48-50) !" },
  { measure: 51, text: "Mes. 51 : CLIMAX fff — Tutti complet + Caisse claire !" },
  { measure: 58, text: "Mes. 58 : Péroraison fff + roulement rythmique percussions" },
  { measure: 61, text: "Mes. 61-62 : Tenue fp < fff et COUPURE NETTE fin m.62 !" }
];

/**
 * Retourne les fréquences de l'accord pour une mesure donnée.
 * Grille harmonique en Ré mineur (Dm, Bb, F, C, Gm, A) pour l'accompagnement synthétisé.
 * @param {number} m - Numéro de mesure (1 à 62)
 * @returns {number[]} Tableau de fréquences en Hz
 */
function getChordForMeasure(m) {
  if (m <= 4) return [146.83, 220.00, 293.66, 349.23]; // Dm
  if (m <= 6) return [116.54, 174.61, 233.08, 293.66]; // Bb
  if (m <= 8) return [146.83, 220.00, 293.66, 349.23]; // Dm
  if (m <= 12) return [146.83, 220.00, 293.66, 349.23]; // Dm
  if (m <= 14) return [116.54, 174.61, 233.08, 293.66]; // Bb
  if (m <= 16) return [130.81, 196.00, 261.63, 329.63]; // C
  if (m <= 20) return [146.83, 220.00, 293.66, 349.23]; // Dm
  if (m <= 22) return [116.54, 174.61, 233.08, 293.66]; // Bb
  if (m <= 24) return [110.00, 164.81, 220.00, 277.18]; // A
  if (m <= 28) return [146.83, 220.00, 293.66, 349.23]; // Dm
  if (m <= 30) return [116.54, 174.61, 233.08, 293.66]; // Bb
  if (m <= 33) return [130.81, 196.00, 261.63, 329.63]; // C -> Dm
  if (m <= 37) return [146.83, 220.00, 293.66, 349.23]; // Dm
  if (m <= 40) return [116.54, 174.61, 233.08, 293.66]; // Bb
  if (m <= 44) return [174.61, 220.00, 261.63, 349.23]; // F
  if (m <= 47) return [130.81, 196.00, 261.63, 329.63]; // C
  if (m <= 50) return [116.54, 174.61, 233.08, 293.66]; // Bb (montée)
  if (m <= 54) return [146.83, 220.00, 293.66, 349.23]; // Dm (Climax)
  if (m <= 57) return [116.54, 174.61, 233.08, 293.66]; // Bb
  if (m <= 60) return [130.81, 196.00, 261.63, 329.63]; // C
  return [146.83, 220.00, 293.66, 349.23]; // Dm Final
/**
 * Construit les données annotées pour chacune des 62 mesures.
 * @returns {Array} Tableau de 62 objets de mesure
 */
function buildMeasureData() {
  const data = [];
  for (let m = 1; m <= TOTAL_MEASURES; m++) {
    let section = "Couplet 1";
    let dyn = "ppp / mf";
    let amp = 1;
    let lhLevel = 20;
    let lhTitle = "—";
    let lhDesc = "—";
    let action = "—";
    let instruments = "—";
    let lyrics = "";

    if (m <= 8) {
      section = "Intro / Couplet 1";
      dyn = m <= 4 ? "ppp" : "pp / mp";
      amp = m <= 4 ? 1 : 2;
      lhLevel = m <= 4 ? 15 : 30;
      lhTitle = m <= 4 ? "🎻 Très retenu" : "🎶 Phrase douce";
      lhDesc = m <= 4 ? "Geste petit, calme, proche du corps." : "Geste souple, impulsion claire.";
      if (m === 1) {
        action = "Donner la levée (4 temps de préparation) puis attaquer le 1er temps avec souplesse.";
        instruments = "Introduction seuls (corde grave, harpe, guitare)";
      } else if (m === 5) {
        action = "Préparer l'entrée de la voix à la mesure 6.";
        instruments = "Voix seule (entrée m.6)";
      } else {
        action = m === 8 ? "Préparer le crescendo vers la mesure 9." : "Accompagner la fin de phrase avec souplesse.";
        instruments = "Guitare acoustique + cordes tenues";
      }
    } else if (m >= 9 && m <= 16) {
      section = "Couplet 2";
      dyn = "mp / mf";
      amp = 2;
      lhLevel = 45;
      lhTitle = "🎤 Couplet 2";
      lhDesc = "Soutenir la voix et le crescendo collectif.";
      if (m === 9) {
        lyrics = "« are you co-ming to the tree? »";
        action = "Entrée du couplet 2 (mp) avec crescendo sur « in the hanging tree ».";
        instruments = "Voix + guitare + cordes (mp)";
      } else if (m === 13) {
        action = "Préparer la respiration et le point d'orgue de la mesure 17 !";
        instruments = "Voix + guitare + cordes tenues";
      } else if (m === 16) {
        action = "Garder l'élan régulier vers le climax du couplet.";
        instruments = "Tutti léger (mf)";
      } else {
        lyrics = m === 10 ? "« Where I told you to run, »" : (m === 11 ? "« so we'd both be free. »" : (m === 12 ? "« no stran-ger would it be »" : (m === 14 ? "« If we met, »" : "« at mid-night »")));
        action = "Poursuivre l'accompagnement régulier du couplet.";
        instruments = "Voix + guitare + cordes";
      }
    } else if (m >= 17 && m <= 24) {
      section = "Timbales & Impact";
      dyn = "f";
      amp = 3;
      lhLevel = 75;
      lhTitle = "🥁 Timbales & Impact";
      lhDesc = "Point d'orgue puis entrée des timbales et grosse caisse.";
      if (m === 17) {
        action = "POINT D'ORGUE au 2e temps, puis attaque des Timbales & Grosse Caisse !";
        instruments = "Timbales & Grosse Caisse (f) après le point d'orgue";
      } else if (m === 18) {
        action = "Entrée Piccolo, Cors, Tpt 2 avec crescendo vers f.";
        instruments = "+ Piccolo, Cors, Trompette 2";
      } else {
        action = "Soutenir le rythme martial des percussions.";
        instruments = "Tutti (f) avec percussions";
      }
    } else if (m >= 25 && m <= 33) {
      section = "Tutti ff";
      dyn = "ff";
      amp = 4;
      lhLevel = 90;
      lhTitle = "💥 TUTTI ff";
      lhDesc = "Battue ample et autoritaire pour le tutti fortissimo.";
      if (m === 25) {
        lyrics = "« in the han-ging tree. »";
        action = "Accompagner le roulement Timbales/BD/Cymbale (p < f) vers le choc ff de m.26 !";
        instruments = "Roulement Timbales + Grosse Caisse + Cymbale suspendue (p < f)";
      } else if (m === 26) {
        lyrics = "« Are you, are you »";
        action = "IMPULSION MAXIMALE (ff) sur le 1er temps pour le Chœur, Timbales, BD et Cymbale !";
        instruments = "TUTTI COMPLET (ff) + Chœur à 2 voix + Timbales & Grosse Caisse";
      } else if (m === 33) {
        action = "Attention : transition immédiate vers le Pont Instrumental (m.34) !";
        instruments = "Tutti (ff) → transition Pont";
      } else {
        lyrics = m === 27 ? "« co-ming to the tree? »" : (m === 28 ? "« Where dead man called out »" : (m === 29 ? "« for his love to flee. »" : (m === 30 ? "« Strange things did hap-pen here, »" : (m === 31 ? "« no stran-ger would it be. »" : (m === 32 ? "« If we met, at mid-night »" : "« in the han-ging tree. »"))));
        action = "Battue ample et autoritaire ; garder le chœur et les cuivres ensemble.";
        instruments = "Tutti (ff)";
      }
    } else if (m >= 34 && m <= 40) {
      section = "Pont Instrumental";
      dyn = "f / mf";
      amp = 3;
      lhLevel = 68;
      lhTitle = "🎺 Thème Instrumental";
      lhDesc = "Mettre en valeur le thème aux Bois/Cordes puis la marche militaire (m.38).";
      if (m === 34) {
        action = "Lancer le thème instrumental (f) : Piccolo & Sax Soprano font un trait rapide vers l'aigu !";
        instruments = "Thème principal Piccolo, Fl.1, Clar.2, Saxs, Cuivres, Cordes (f)";
      } else if (m === 38) {
        action = "Marquer les accents secs de Grosse Caisse et Caisse Claire (temps 1 et 2) !";
        instruments = "+ Entrée Caisse Claire & Grosse Caisse rythmique (accents)";
      } else {
        action = m === 40 ? "Diminuendo puis préparer l'entrée vocale « Ah » à la mesure 41 !" : "Soutenir le chant instrumental sans ralentir.";
        instruments = "Ensemble orchestral (mf/f) avec relais graves Tbn/Tuba/Timbales";
      }
    } else if (m >= 41 && m <= 47) {
      section = "Vocalises « Ah »";
      dyn = "mf / ff";
      amp = 3;
      lhLevel = 72;
      lhTitle = "🎤 Départ Voix « Ah »";
      lhDesc = "Montrer clairement l'entrée du chœur « Ah » et les accents des Cors/Altos.";
      if (m === 41) {
        lyrics = "« Ah ————— »";
        action = "Donner l'entrée du Chœur « Ah » (mf) + Flûtes/Piccolo/Sax Sop. (ff) sur le 2e temps !";
        instruments = "Voix « Ah » (mf) + Piccolo, Fl.2, Sax Sop/Tén, Tpt 2 (ff)";
      } else {
        lyrics = "« Ah ————— »";
        action = m === 47 ? "Préparer la chute subite piano (p) de la mesure 48 pour la grande montée !" : "Accentuer les syncopes des Cors et Saxophones Altos.";
        instruments = "Chœur « Ah » + Tutti orchestral soutenu";
      }
    } else if (m >= 48 && m <= 50) {
      section = "Grande Montée";
      dyn = "p < fff";
      amp = m === 48 ? 2 : (m === 49 ? 3 : 4);
      lhLevel = m === 48 ? 35 : (m === 49 ? 65 : 92);
      lhTitle = "📈 Levée progressive !";
      lhDesc = "Lever lentement la main gauche paume vers le haut sur 3 mesures jusqu'à fff !";
      if (m === 48) {
        action = "RETOMBER PIANO (p) d'un coup, puis commencer à faire monter tout l'orchestre !";
        instruments = "Tout l'orchestre en nappes longues (p) + roulement Timbales/BD/SD";
      } else if (m === 49) {
        action = "CONTINUER LA MONTÉE (crescendo) : agrandir progressivement la battue !";
        instruments = "Crescendo général sur harmonies tenues";
      } else {
        action = "DERNIÈRE MESURE DE MONTÉE (< fff) : préparer l'impact géant de la mesure 51 !";
        instruments = "Crescendo maximal vers le Climax fff";
      }
    } else if (m >= 51 && m <= 57) {
      section = "Climax fff";
      dyn = "fff";
      amp = 4;
      lhLevel = 98;
      lhTitle = "💥 CLIMAX MAXIMAL (fff)";
      lhDesc = "Battue très large et puissante ; soutenir les aigus des flûtes, cuivres et chœur.";
      if (m === 51) {
        action = "EXPLOSION fff ! Coup de cymbale, caisse claire et chœur fortissimo !";
        instruments = "TOUT L'ORCHESTRE (fff) + Caisse claire, Grosse Caisse, Cymbale";
      } else {
        action = m === 57 ? "Grand crescendo final sur les blanches vers la péroraison (m.58) !" : "Garder une battue royale, large et très lisible pour les 800 musiciens.";
        instruments = "Tutti fff soutenu (cuivres, bois aigus, chœur, percussions)";
      }
    } else if (m >= 58 && m <= 62) {
      section = "Final & Arrêt";
      dyn = m >= 61 ? "fp < fff" : "fff";
      amp = m >= 61 ? 5 : 4;
      lhLevel = m >= 61 ? 100 : 95;
      lhTitle = m >= 61 ? "✋ Tenue puis COUPURE !" : "🔥 Péroraison fff";
      lhDesc = m >= 61 ? "Bloquer la note tenue (fp), faire gonfler jusqu'à fff et couper net sur le 4e temps !" : "Marquer les croches pointées-doubles des percussions et cuivres.";
      if (m === 58) {
        action = "PÉRAISON fff : thème triomphal avec roulements de Timbales et Caisse Claire !";
        instruments = "Tutti fff + rythme martial Timbales / BD / SD";
      } else if (m === 61) {
        action = "ACCORD FINAL TENU (fp) : stabiliser la tenue et amorcer le crescendo final !";
        instruments = "Tutti général sur Ré mineur tenu (fp <)";
      } else if (m === 62) {
        action = "GONFLER JUSQU'À fff ET COUPER NET SUR LE 4e TEMPS (geste sec des deux mains) !";
        instruments = "Crescendo final fff + COUPURE GÉNÉRALE fin de mesure 62 !";
      } else {
        action = "Maintenir la puissance maximale fff jusqu'à l'accord final (m.61) !";
        instruments = "Tutti fff complet";
      }
    }

    data.push({
      measure: m,
      section,
      dyn,
      amp,
      lhLevel,
      lhTitle,
      lhDesc,
      action,
      instruments,
      lyrics
    });
  }
  return data;
}

/** Données de toutes les 62 mesures, générées par buildMeasureData() */
const SCORE_DATA = buildMeasureData();
/**
 * Définition des pupitres de l'orchestre pour la simulation.
 * Chaque pupitre a une position (x, y), une taille (w), une couleur, une famille,
 * et une liste de plages de mesures de silence (rests).
 */
const ORCHESTRA_GROUPS = [
  { id: "violin1", name: "Violons 1", label: "Violons I", family: "Cordes", color: "#8f5963", x: 170, y: 380, w: 92, rests: [] },
  { id: "violin2", name: "Violons 2", label: "Violons II", family: "Cordes", color: "#8f5963", x: 285, y: 380, w: 92, rests: [] },
  { id: "viola", name: "Altos", label: "Altos", family: "Cordes", color: "#8f5963", x: 400, y: 380, w: 82, rests: [] },
  { id: "cello", name: "Violoncelles", label: "Violcelles", family: "Cordes", color: "#8f5963", x: 500, y: 380, w: 96, rests: [[62, 62]] },
  { id: "contrabass", name: "Contrebasses", label: "Contreb.", family: "Cordes", color: "#8f5963", x: 610, y: 380, w: 100, rests: [[62, 62]] },
  { id: "flute1", name: "Flûte 1", label: "Fl. 1", family: "Bois", color: "#6a8c8c", x: 120, y: 220, w: 78, rests: [[1, 13], [18, 24], [34, 40]] },
  { id: "flute2", name: "Flûte 2", label: "Fl. 2", family: "Bois", color: "#6a8c8c", x: 220, y: 220, w: 78, rests: [[1, 13], [18, 24], [34, 40]] },
  { id: "piccolo", name: "Piccolo", label: "Picc.", family: "Bois", color: "#6a8c8c", x: 320, y: 220, w: 72, rests: [[1, 17], [25, 40]] },
  { id: "oboe", name: "Hautbois", label: "Hautb.", family: "Bois", color: "#6a8c8c", x: 420, y: 220, w: 80, rests: [[1, 5], [18, 24]] },
  { id: "clarinet1", name: "Clarinette 1", label: "Cl. 1", family: "Bois", color: "#6a8c8c", x: 520, y: 220, w: 86, rests: [[1, 5], [18, 24]] },
  { id: "clarinet2", name: "Clarinette 2", label: "Cl. 2", family: "Bois", color: "#6a8c8c", x: 620, y: 220, w: 86, rests: [[1, 13]] },
  { id: "bassoon", name: "Basson", label: "Basson", family: "Bois", color: "#6a8c8c", x: 720, y: 220, w: 80, rests: [[1, 5]] },
  { id: "horn1", name: "Cor 1", label: "Cor 1", family: "Cuivres", color: "#b8860b", x: 140, y: 130, w: 90, rests: [[1, 17]] },
  { id: "horn2", name: "Cor 2", label: "Cor 2", family: "Cuivres", color: "#b8860b", x: 250, y: 130, w: 90, rests: [[1, 17]] },
  { id: "trumpet1", name: "Trompette 1", label: "Tpt 1", family: "Cuivres", color: "#b8860b", x: 360, y: 130, w: 86, rests: [[1, 17]] },
  { id: "trumpet2", name: "Trompette 2", label: "Tpt 2", family: "Cuivres", color: "#b8860b", x: 470, y: 130, w: 86, rests: [[1, 17]] },
  { id: "trombone", name: "Trombone", label: "Tbn.", family: "Cuivres", color: "#b8860b", x: 580, y: 130, w: 92, rests: [[1, 33]] },
  { id: "tuba", name: "Tuba", label: "Tuba", family: "Cuivres", color: "#b8860b", x: 690, y: 130, w: 92, rests: [[1, 33]] },
  { id: "timpani", name: "Timbales", label: "Timbales", family: "Percussions", color: "#907c65", x: 260, y: 130, w: 96, rests: [[1, 16], [31, 37]] },
  { id: "bassDrum", name: "Grosse caisse", label: "Grosse c.", family: "Percussions", color: "#907c65", x: 360, y: 130, w: 96, rests: [[1, 16], [31, 37]] },
  { id: "snare", name: "Caisse claire", label: "Caisse cl.", family: "Percussions", color: "#907c65", x: 460, y: 130, w: 92, rests: [[1, 37]] },
  { id: "percussion", name: "Percussion", label: "Percussion", family: "Percussions", color: "#907c65", x: 560, y: 130, w: 88, rests: [[1, 24], [27, 33], [37, 48], [62, 62]] },
  { id: "acousticGuitar", name: "Guitare acoustique", label: "Guit. acoust.", family: "Guitares", color: "#786a7d", x: 200, y: 75, w: 104, rests: [[1, 33]] },
  { id: "voice", name: "Voix", label: "Voix", family: "Voix", color: "#9a6f80", x: 400, y: 75, w: 76, rests: [[34, 40]] },
  { id: "bassGuitar", name: "Guitare basse", label: "Guitare basse", family: "Guitares", color: "#786a7d", x: 600, y: 75, w: 98, rests: [] }
];
/**
 * Cues annotés explicitement dans la partition (entrées programmées).
 * Utilisés pour la simulation des entrées de pupitres.
 */
const ANNOTATED_CUES = [
  { measure: 1, beat: 1, groups: ["trumpet1", "voice"], label: "Entrée de la voix et de la trompette 1" },
  { measure: 17, beat: 1, groups: ["timpani", "bassDrum"], label: "Attaque des timbales et de la grosse caisse après le point d'orgue" },
  { measure: 26, beat: 0, groups: ["voice", "bassDrum"], label: "Impact tutti : voix et grosse caisse" },
  { measure: 51, beat: 0, groups: ["voice", "snare", "bassDrum"], label: "Explosion du climax et attaque des percussions" },
  { measure: 58, beat: 0, groups: ["timpani", "snare"], label: "Péroraison et relance rythmique" },
  { measure: 61, beat: 0, groups: ["cello", "contrabass"], label: "Accord final tenu" }
];

/**
 * Vérifie si un pupitre joue dans une mesure donnée (pas de silence).
 * @param {Object} group - Objet pupitre avec propriété rests
 * @param {number} measure - Numéro de mesure
 * @returns {boolean} true si le pupitre joue dans cette mesure
 */
function isGroupPlayingInMeasure(group, measure) {
  return !group.rests.some(([start, end]) => measure >= start && measure <= end);
}

/**
 * Construit la liste complète des cues de simulation en combinant les cues annotés
 * avec les entrées détectées automatiquement (pupitres qui commencent à jouer).
 * @returns {Array} Tableau de cues trié par rang (mesure * 4 + temps)
 */
function buildSimulationCues() {
  const cues = [...ANNOTATED_CUES];
  const explicitlyCalled = new Set(ANNOTATED_CUES.flatMap(cue =>
    cue.groups.map(groupId => `${cue.measure}:${groupId}`)
  ));

  for (let measure = 2; measure <= TOTAL_MEASURES; measure++) {
    const enteringGroups = ORCHESTRA_GROUPS
      .filter(group =>
        isGroupPlayingInMeasure(group, measure) &&
        !isGroupPlayingInMeasure(group, measure - 1) &&
        !explicitlyCalled.has(`${measure}:${group.id}`)
      )
      .map(group => group.id);
    if (enteringGroups.length) {
      const names = enteringGroups.map(groupId =>
        ORCHESTRA_GROUPS.find(group => group.id === groupId).name
      );
      cues.push({
        measure,
        beat: 0,
        groups: enteringGroups,
        label: `Entrée de ${names.join(", ")}`
      });
    }
  }

  return cues.sort((a, b) => (a.measure * 4 + a.beat) - (b.measure * 4 + b.beat));
}

/** Cues de simulation pré-calculés au chargement */
const SIMULATION_CUES = buildSimulationCues();
}