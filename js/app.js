    // =========================================================================
    // 1. DONNÉES COMPLÈTES DES 62 MESURES — THE HANGING TREE (ARR. J. PENIN)
    // =========================================================================
    const TOTAL_MEASURES = 62;
    const BASE_BPM = 100;
    const CUE_NOTICE_LEAD_BEATS = 4;

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

    // Grille harmonique (Ré mineur : Dm, Bb, F, C, Gm, A) pour l'accompagnement synthétisé
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
    }

    function buildMeasureData() {
      const data = [];
      for (let m = 1; m <= TOTAL_MEASURES; m++) {
        let section = "Couplet 1";
        let dyn = "ppp / mf";
        let amp = 1; // 1: très petite, 2: moyenne, 3: large, 4: très large (fff), 5: tenue finale
        let lhLevel = 20; // % hauteur jauge main gauche
        let lhTitle = "🤚 Paume vers le bas";
        let lhDesc = "Contenir les nappes ppp/pp ; garder un geste calme et proche du corps.";
        let action = "Battue légère à 4 temps ; accompagner la ligne vocale et Trompette 1.";
        let instruments = "Fl. 2, Clar. 1-2, Saxs, Tbn, Tuba, Basse, Cordes (ppp) + Tpt 1 & Voix (mf)";
        let lyrics = "";

        if (m === 1) {
          lyrics = "« Are you, are you »";
          action = "Temps 1 doux pour la nappe, puis regard & léger signe à Trompette 1 + Voix sur le 2e temps.";
        } else if (m === 2) {
          lyrics = "« co-ming to the tree? »";
          action = "Maintenir la pulsation régulière à 100 BPM sans presser sur les croches.";
        } else if (m === 3) {
          lyrics = "« Wear a neck-lace of hope, »";
          action = "Soutenir le phrasé lié des cordes et des trombones.";
        } else if (m === 4) {
          lyrics = "« side by side with me. »";
          action = "Préparer du regard le Hautbois et le Basson pour la mesure 5.";
        } else if (m === 5) {
          dyn = "p / mf";
          lhLevel = 28;
          lyrics = "« Strange things did hap-pen here, »";
          action = "Départ doux main gauche pour Hautbois (p), Clar. 1 (pp) et Basson (p).";
          instruments = "+ Entrée Hautbois, Clar. 1, Basson (p/pp) sur la mélodie";
        } else if (m >= 6 && m <= 8) {
          lyrics = m === 6 ? "« no stran-ger would it be. »" : (m === 7 ? "« If we met, »" : "« at mid-night »");
          action = m === 8 ? "Préparer le léger crescendo collectif de la mesure 9." : "Accompagner la fin de phrase avec souplesse.";
        } else if (m >= 9 && m <= 16) {
          section = "Couplet 2";
          dyn = "mp / mf";
          amp = 2;
          lhLevel = 42;
          lhTitle = "〰 Soutien souple (mp)";
          lhDesc = "Geste un peu plus ouvert : les cordes et saxophones passent à mp.";
          if (m === 9) {
            lyrics = "« in the han-ging tree. Are you, »";
            action = "Crescendo de la nappe (ppp -> mp) sur les temps 1-2 ; relancer le 2e couplet.";
            instruments = "Nappes passent à mp + Basse électrique (mp) + Tpt 1 & Voix";
          } else if (m === 13) {
            lyrics = "« Strange things did hap-pen here, »";
            action = "Donner l'entrée de la Flûte 1 (p) et du Hautbois (mp) sur le 1er temps.";
            instruments = "+ Entrée Flûte 1 (p) & Hautbois (mp) à l'octave";
          } else {
            lyrics = m === 10 ? "« are you co-ming to the tree? »" : (m === 11 ? "« Where I told you to run, »" : (m === 12 ? "« so we'd both be free. »" : (m === 14 ? "« no stran-ger would it be »" : (m === 15 ? "« If we met, »" : "« at mid-night »"))));
            action = m === 16 ? "Préparer la respiration et le point d'orgue de la mesure 17 !" : "Garder l'élan régulier vers le climax du couplet.";
          }
        } else if (m >= 17 && m <= 24) {
          section = "Couplet 3 (Percussions)";
          dyn = "mf -> f";
          amp = 3;
          lhLevel = 65;
          lhTitle = "⚡ Appels rythmiques (f)";
          lhDesc = "Main gauche active : marquer l'entrée des Timbales/Grosse Caisse et porter le crescendo.";
          if (m === 17) {
            lyrics = "« in the han-ging tree. » (Point d'orgue)";
            action = "Tenir le point d'orgue (t.2), couper net puis donner l'entrée forte Timbales + Grosse Caisse !";
            instruments = "Point d'orgue général + Entrée Timbales & Grosse Caisse (f)";
          } else if (m === 18) {
            lyrics = "« Are you, are you »";
            action = "Entrée Piccolo, Cors en Fa et Trompette 2 ; amorcer un grand crescendo vers f.";
            instruments = "+ Entrée Piccolo, Cors, Tpt 2, Sax Soprano & Ténor (mf)";
          } else if (m === 20) {
            dyn = "f";
            lyrics = "« They strung up a man, »";
            action = "Plein forte (f) ! Battue large et bien ancrée pour tout l'orchestre.";
            instruments = "Tutti bois, cuivres, cordes & Grosse Caisse (f)";
          } else {
            lyrics = m === 19 ? "« co-ming to the tree? »" : (m === 21 ? "« they say who mur-dered three. »" : (m === 22 ? "« Strange things did hap-pen here, »" : (m === 23 ? "« no stran-ger would it be. »" : "« If we met, at mid-night »")));
            action = m === 24 ? "Préparer le roulement de Timbales/Cymbale vers l'explosion ff (m.25) !" : "Maintenir l'énergie forte et la précision rythmique.";
          }
        } else if (m >= 25 && m <= 33) {
          section = "Couplet 4 (Tutti ff)";
          dyn = "ff";
          amp = 4;
          lhLevel = 82;
          lhTitle = "🔥 Puissance Tutti (ff)";
          lhDesc = "Deux mains engagées : porter le chœur ff et la Grosse Caisse sur chaque temps.";
          if (m === 25) {
            lyrics = "« in the han-ging tree. »";
            action = "Accompagner le roulement Timbales/BD/Cymbale (p < f) vers le choc ff de m.26 !";
            instruments = "Roulement Timbales + Grosse Caisse + Cymbale suspendue (p < f)";
          } else if (m === 26) {
            lyrics = "« Are you, are you »";
            action = "IMPULSION MAXIMALE (ff) sur le 1er temps pour le Chœur, Timbales, BD et Cymbale !";
            instruments = "TUTTI COMPLET (ff) + Chœur à 2 voix + Timbales & Grosse Caisse";
          } else {
            lyrics = m === 27 ? "« co-ming to the tree? »" : (m === 28 ? "« Where dead man called out »" : (m === 29 ? "« for his love to flee. »" : (m === 30 ? "« Strange things did hap-pen here, »" : (m === 31 ? "« no stran-ger would it be. »" : (m === 32 ? "« If we met, at mid-night »" : "« in the han-ging tree. »")))));
            action = m === 33 ? "Attention : transition immédiate vers le Pont Instrumental (m.34) !" : "Battue ample et autoritaire ; garder le chœur et les cuivres ensemble.";
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

    const SCORE_DATA = buildMeasureData();

    // Intervals list measures with a full-bar rest in the corresponding staff.
    const ORCHESTRA_GROUPS = [
      { id: "violin1", name: "Violons 1", label: "Violons I", family: "Cordes", color: "#8f5963", x: 170, y: 380, w: 92, rests: [] },
      { id: "violin2", name: "Violons 2", label: "Violons II", family: "Cordes", color: "#8f5963", x: 285, y: 380, w: 92, rests: [] },
      { id: "viola", name: "Altos", label: "Altos", family: "Cordes", color: "#8f5963", x: 400, y: 380, w: 82, rests: [] },
      { id: "cello", name: "Violoncelles", label: "Violoncelles", family: "Cordes", color: "#8f5963", x: 515, y: 380, w: 96, rests: [] },
      { id: "contrabass", name: "Contrebasses", label: "Contrebasses", family: "Cordes", color: "#8f5963", x: 635, y: 380, w: 104, rests: [] },
      { id: "piccolo", name: "Piccolo", label: "Piccolo", family: "Bois", color: "#92747b", x: 100, y: 310, w: 78, rests: [[1, 17]] },
      { id: "flute1", name: "Flûte 1", label: "Flûte 1", family: "Bois", color: "#92747b", x: 200, y: 310, w: 78, rests: [[1, 13]] },
      { id: "flute2", name: "Flûte 2", label: "Flûte 2", family: "Bois", color: "#92747b", x: 300, y: 310, w: 78, rests: [[34, 40]] },
      { id: "oboe", name: "Hautbois", label: "Hautbois", family: "Bois", color: "#92747b", x: 400, y: 310, w: 82, rests: [[1, 5], [10, 13]] },
      { id: "clarinet1", name: "Clarinette 1", label: "Clar. 1", family: "Bois", color: "#92747b", x: 500, y: 310, w: 78, rests: [[2, 5], [10, 13]] },
      { id: "clarinet2", name: "Clarinette 2", label: "Clar. 2", family: "Bois", color: "#92747b", x: 600, y: 310, w: 78, rests: [] },
      { id: "bassoon", name: "Basson", label: "Basson", family: "Bois", color: "#92747b", x: 700, y: 310, w: 78, rests: [[1, 5], [10, 13]] },
      { id: "saxSoprano", name: "Saxophone soprano", label: "Sax sop.", family: "Saxophones", color: "#92747b", x: 250, y: 250, w: 82, rests: [] },
      { id: "saxAlto", name: "Saxophone alto", label: "Sax alto", family: "Saxophones", color: "#92747b", x: 350, y: 250, w: 82, rests: [] },
      { id: "saxTenor", name: "Saxophone ténor", label: "Sax ténor", family: "Saxophones", color: "#92747b", x: 450, y: 250, w: 82, rests: [[34, 36]] },
      { id: "saxBaritone", name: "Saxophone baryton", label: "Sax bary.", family: "Saxophones", color: "#92747b", x: 550, y: 250, w: 88, rests: [] },
      { id: "horn", name: "Cor en Fa", label: "Cor en Fa", family: "Cuivres", color: "#a96873", x: 150, y: 190, w: 84, rests: [[1, 17]] },
      { id: "trumpet1", name: "Trompette 1", label: "Tromp. 1", family: "Cuivres", color: "#a96873", x: 250, y: 190, w: 82, rests: [[42, 48]] },
      { id: "trumpet2", name: "Trompette 2", label: "Tromp. 2", family: "Cuivres", color: "#a96873", x: 350, y: 190, w: 82, rests: [[1, 16]] },
      { id: "trombone1", name: "Trombone 1", label: "Trombone 1", family: "Cuivres", color: "#a96873", x: 450, y: 190, w: 88, rests: [] },
      { id: "trombone2", name: "Trombone 2", label: "Trombone 2", family: "Cuivres", color: "#a96873", x: 550, y: 190, w: 88, rests: [] },
      { id: "tuba", name: "Tuba", label: "Tuba", family: "Cuivres", color: "#a96873", x: 650, y: 190, w: 72, rests: [] },
      { id: "timpani", name: "Timbales", label: "Timbales", family: "Percussions", color: "#907c65", x: 260, y: 130, w: 86, rests: [[1, 16], [19, 24], [28, 32], [35, 36]] },
      { id: "bassDrum", name: "Grosse caisse", label: "Grosse caisse", family: "Percussions", color: "#907c65", x: 360, y: 130, w: 96, rests: [[1, 16], [31, 37]] },
      { id: "snare", name: "Caisse claire", label: "Caisse claire", family: "Percussions", color: "#907c65", x: 460, y: 130, w: 92, rests: [[1, 37]] },
      { id: "percussion", name: "Percussion", label: "Percussion", family: "Percussions", color: "#907c65", x: 560, y: 130, w: 88, rests: [[1, 24], [27, 33], [37, 48], [62, 62]] },
      { id: "acousticGuitar", name: "Guitare acoustique", label: "Guit. acoust.", family: "Guitares", color: "#786a7d", x: 200, y: 75, w: 104, rests: [[1, 33]] },
      { id: "voice", name: "Voix", label: "Voix", family: "Voix", color: "#9a6f80", x: 400, y: 75, w: 76, rests: [[34, 40]] },
      { id: "bassGuitar", name: "Guitare basse", label: "Guitare basse", family: "Guitares", color: "#786a7d", x: 600, y: 75, w: 98, rests: [] }
    ];

    const ANNOTATED_CUES = [
      { measure: 1, beat: 1, groups: ["trumpet1", "voice"], label: "Entrée de la voix et de la trompette 1" },
      { measure: 17, beat: 1, groups: ["timpani", "bassDrum"], label: "Attaque des timbales et de la grosse caisse après le point d’orgue" },
      { measure: 26, beat: 0, groups: ["voice", "bassDrum"], label: "Impact tutti : voix et grosse caisse" },
      { measure: 51, beat: 0, groups: ["voice", "snare", "bassDrum"], label: "Explosion du climax et attaque des percussions" },
      { measure: 58, beat: 0, groups: ["timpani", "snare"], label: "Péroraison et relance rythmique" },
      { measure: 61, beat: 0, groups: ["cello", "contrabass"], label: "Accord final tenu" }
    ];

    function isGroupPlayingInMeasure(group, measure) {
      return !group.rests.some(([start, end]) => measure >= start && measure <= end);
    }

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
          const names = enteringGroups.map(groupId => ORCHESTRA_GROUPS.find(group => group.id === groupId).name);
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

    const SIMULATION_CUES = buildSimulationCues();

    // =========================================================================
    // 2. MOTEUR AUDIO WEB AUDIO API (SYNTHÉ ORCHESTRAL + MÉTRONOME + MP3)
    // =========================================================================
    class OrchestraAudioEngine {
      constructor() {
        this.ctx = null;
        this.metronomeOn = true;
        this.customAudio = null;
        this.customUrl = null;
        this.hasCustomFile = false;
        this.customAudioReady = false;
      }

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

      playClick(beatIndex, isCountIn) {
        if (!this.metronomeOn || !this.init()) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // Temps 1 plus aigu (1000 Hz), temps 2-3-4 (720 Hz)
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
      }

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

      clearCustomFile() {
        if (this.customAudio) {
          this.customAudio.pause();
          try {
            this.customAudio.currentTime = 0;
          } catch (error) {
            console.warn("Impossible de remettre l’audio à zéro.", error);
          }
          this.customAudioReady = false;
        }
        if (this.customUrl) {
          URL.revokeObjectURL(this.customUrl);
          this.customUrl = null;
        }
        this.hasCustomFile = false;
      }

      syncCustomAudio(measure, speed, shouldPlay, forceSeek = false) {
        if (!this.hasCustomFile || !this.customAudio) return;
        const secPerMeasure = (60 / BASE_BPM) * 4;
        const targetTime = Math.max(0, (measure - 1) * secPerMeasure);

        try {
          // Le fichier de référence reste à BASE_BPM ; le choix de vitesse ajuste
          // sa lecture sans déplacer les repères de mesure.
          this.customAudio.playbackRate = (state.bpm * speed) / BASE_BPM;

          // On ne recale le fichier que lors d’un vrai déplacement utilisateur
          // (mesure cliquée, reset ou démarrage), jamais à chaque temps.
          // Pendant la lecture, audio.currentTime est l’horloge principale.
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
          // Un souci avec le média ne doit jamais arrêter la boucle de direction.
          console.warn("Synchronisation MP3 ignorée ; la battue continue.", error);
        }
      }
    }

    const audioEngine = new OrchestraAudioEngine();

    // =========================================================================
    // 3. ÉTAT DE L'APPLICATION & INTERFACE
    // =========================================================================
    const state = {
      isPlaying: false,
      isCountIn: false,
      countInBeat: 0, // 0, 1, 2, 3
      speed: 1.0,
      bpm: BASE_BPM,
      audioOffset: 0,
      loopSection: false,
      currentMeasure: 1,
      currentBeat: 0, // 0, 1, 2, 3
      beatProgress: 0,
      lastTime: 0,
      ictusFlash: 0
    };

    // Références DOM
    const playPauseBtn = document.getElementById("playPauseBtn");
    const iconPlay = document.getElementById("iconPlay");
    const iconPause = document.getElementById("iconPause");
    const playBtnText = document.getElementById("playBtnText");
    const resetBtn = document.getElementById("resetBtn");
    const metroBtn = document.getElementById("metroBtn");
    const metroText = document.getElementById("metroText");
    const loopBtn = document.getElementById("loopBtn");
    const loopText = document.getElementById("loopText");
    const audioFileInput = document.getElementById("audioFileInput");
    const audioSourceLabel = document.getElementById("audioSourceLabel");
    const clearMp3Btn = document.getElementById("clearMp3Btn");
    const audioModeStatus = document.getElementById("audioModeStatus");
    const audioTestBtn = document.getElementById("audioTestBtn");
    const measureSlider = document.getElementById("measureSlider");
    const scrubberLabel = document.getElementById("scrubberLabel");
    const bpmLabel = document.getElementById("bpmLabel");
    const sectionPillsRow = document.getElementById("sectionPillsRow");
    const scoreListContainer = document.getElementById("scoreListContainer");

    // Panneau des deux mains & prompteur
    const canvas = document.getElementById("conductingCanvas");
    const ctx = canvas.getContext("2d");
    const canvasBox = document.getElementById("canvasBox");
    const beatDots = document.querySelectorAll(".beat-dot");
    const rightHandMode = document.getElementById("rightHandMode");
    const ampTag = document.getElementById("ampTag");
    const countInOverlay = document.getElementById("countInOverlay");
    const countInNum = document.getElementById("countInNum");
    const countInHint = document.getElementById("countInHint");

    const dynamicBadge = document.getElementById("dynamicBadge");
    const openDetailBtn = document.getElementById("openDetailBtn");
    const openExerciseBtn = document.getElementById("openExerciseBtn");
    const lhGaugeFill = document.getElementById("lhGaugeFill");
    const lhGestureTitle = document.getElementById("lhGestureTitle");
    const lhGestureDesc = document.getElementById("lhGestureDesc");
    const prompterMeasure = document.getElementById("prompterMeasure");
    const nextCueChip = document.getElementById("nextCueChip");
    const actionNowText = document.getElementById("actionNowText");
    const nextCueText = document.getElementById("nextCueText");

    // Modale & Toast
    const guideModal = document.getElementById("guideModal");
    const openGuideBtn = document.getElementById("openGuideBtn");
    const closeGuideBtn = document.getElementById("closeGuideBtn");
    const detailModal = document.getElementById("detailModal");
    const closeDetailBtn = document.getElementById("closeDetailBtn");
    const detailMeasureTitle = document.getElementById("detailMeasureTitle");
    const detailSectionText = document.getElementById("detailSectionText");
    const detailDynValue = document.getElementById("detailDynValue");
    const detailDynFill = document.getElementById("detailDynFill");
    const detailNuanceText = document.getElementById("detailNuanceText");
    const detailActionText = document.getElementById("detailActionText");
    const detailGestureTitle = document.getElementById("detailGestureTitle");
    const detailGestureDesc = document.getElementById("detailGestureDesc");
    const detailHandIcon = document.getElementById("detailHandIcon");
    const detailCueText = document.getElementById("detailCueText");
    const detailInstrumentsText = document.getElementById("detailInstrumentsText");
    const detailNextText = document.getElementById("detailNextText");
    const detailTempoText = document.getElementById("detailTempoText");
    const exerciseModal = document.getElementById("exerciseModal");
    const closeExerciseBtn = document.getElementById("closeExerciseBtn");
    const startExerciseBtn = document.getElementById("startExerciseBtn");
    const exerciseTapBtn = document.getElementById("exerciseTapBtn");
    const exerciseScore = document.getElementById("exerciseScore");
    const exerciseStatus = document.getElementById("exerciseStatus");
    const exerciseLiveFeedback = document.getElementById("exerciseLiveFeedback");
    const exerciseLastError = document.getElementById("exerciseLastError");
    const exerciseBestScore = document.getElementById("exerciseBestScore");
    const exerciseStreak = document.getElementById("exerciseStreak");
    const clearExerciseHistoryBtn = document.getElementById("clearExerciseHistoryBtn");
    const exerciseHistorySummary = document.getElementById("exerciseHistorySummary");
    const exerciseHistoryList = document.getElementById("exerciseHistoryList");
    const orchestraSvg = document.getElementById("orchestraSvg");
    const orchestraTrashZone = document.getElementById("orchestraTrashZone");
    const orchestraPresenceCount = document.getElementById("orchestraPresenceCount");
    const restoreOrchestraBtn = document.getElementById("restoreOrchestraBtn");
    const orchestraDesksLayer = document.getElementById("orchestraDesksLayer");
    const orchestraInfo = document.getElementById("orchestraInfo");
    const simulationInstructions = document.getElementById("simulationInstructions");
    const startSimulationBtn = document.getElementById("startSimulationBtn");
    const simulationHits = document.getElementById("simulationHits");
    const simulationMisses = document.getElementById("simulationMisses");
    const simulationErrors = document.getElementById("simulationErrors");
    const simulationMeasure = document.getElementById("simulationMeasure");
    const simulationTempo = document.getElementById("simulationTempo");
    const simulationDynamic = document.getElementById("simulationDynamic");
    const toastMsg = document.getElementById("toastMsg");
    let toastTimer = null;
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

    function showToast(msg) {
      toastMsg.textContent = msg;
      toastMsg.classList.remove("hidden");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toastMsg.classList.add("hidden"), 2600);
    }

    function renderOrchestraControls() {
      const absentCount = ORCHESTRA_GROUPS.filter(group => group.active === false).length;
      orchestraPresenceCount.textContent = `${ORCHESTRA_GROUPS.length - absentCount}/${ORCHESTRA_GROUPS.length} présents`;
      restoreOrchestraBtn.disabled = simulation.active || absentCount === 0;
      orchestraTrashZone.classList.toggle("is-disabled", simulation.active);
      orchestraTrashZone.setAttribute("aria-disabled", String(simulation.active));
    }

    function removeOrchestraGroup(group) {
      if (simulation.active || group.active === false) return;
      group.active = false;
      simulation.message = `${group.name} retiré·e de l’effectif.`;
      renderOrchestraControls();
      renderOrchestraDesks();
      showToast(`${group.name} retiré·e — utilisez la flèche pour tout rétablir.`);
    }

    function isPointerOverTrash(event) {
      const bounds = orchestraTrashZone.getBoundingClientRect();
      return event.clientX >= bounds.left && event.clientX <= bounds.right &&
        event.clientY >= bounds.top && event.clientY <= bounds.bottom;
    }

    function getOrchestraGroup(groupId) {
      return ORCHESTRA_GROUPS.find(group => group.id === groupId);
    }

    function getCueRank(cue) {
      return (cue.measure - 1) * 4 + cue.beat;
    }

    function getGroupClockPosition(group) {
      const degrees = (Math.atan2(group.x - 400, 455 - group.y) * 180 / Math.PI + 360) % 360;
      const halfHours = Math.round(degrees / 15) % 24;
      const hour = Math.floor(halfHours / 2) || 12;
      return `${hour} h${halfHours % 2 ? " 30" : ""}`;
    }

    function renderOrchestraDesks() {
      orchestraDesksLayer.innerHTML = "";
      ORCHESTRA_GROUPS.forEach(group => {
        if (group.active === false) return;
        const desk = document.createElementNS("http://www.w3.org/2000/svg", "g");
        desk.setAttribute("class", "desk-node");
        desk.setAttribute("transform", `translate(${group.x}, ${group.y}) rotate(${group.angle || 0})`);
        desk.setAttribute("tabindex", "0");
        desk.setAttribute("role", "button");
        desk.setAttribute("aria-label", `${group.name}, présent, ${getGroupClockPosition(group)}. Appuyez sur Suppr pour retirer ce pupitre.`);
        desk.dataset.groupId = group.id;

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

        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", 0);
        text.setAttribute("y", 4);
        text.setAttribute("fill", "#f8fafc");
        text.setAttribute("font-size", "14");
        text.setAttribute("font-weight", "700");
        text.setAttribute("text-anchor", "middle");
        text.textContent = group.label;
        desk.append(rect, text);

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
          const bounds = orchestraSvg.getBoundingClientRect();
          const dx = (event.clientX - drag.startX) * 800 / bounds.width;
          const dy = (event.clientY - drag.startY) * 510 / bounds.height;
          if (Math.abs(dx) + Math.abs(dy) > 4) drag.moved = true;
          orchestraTrashZone.classList.toggle("is-drop-target", drag.moved && isPointerOverTrash(event));
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
          orchestraTrashZone.classList.remove("is-drop-target");
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
          orchestraTrashZone.classList.remove("is-drop-target");
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
        orchestraDesksLayer.appendChild(desk);
      });
      updateSimulationUI();
    }

    function updateSimulationUI(message) {
      if (message) simulation.message = message;
      simulationHits.textContent = simulation.hits;
      simulationMisses.textContent = simulation.misses;
      simulationErrors.textContent = simulation.errors;
      simulationMeasure.textContent = simulation.active
        ? `M. ${state.currentMeasure} • ${state.currentBeat + 1}/4`
        : "—";
      simulationTempo.textContent = `${Math.round(state.bpm * state.speed)} BPM`;
      simulationDynamic.textContent = SCORE_DATA[state.currentMeasure - 1].dyn;
      startSimulationBtn.textContent = simulation.active ? "Arrêter la simulation" : "Lancer la simulation";
      simulationInstructions.textContent = simulation.active
        ? "Les pupitres dorés sont annoncés jusqu’à une mesure avant leur entrée. Touchez-les avant le départ ; les absents sont exclus du score."
        : "Les états suivent chaque mesure de la partition ; lancez la répétition pour vous entraîner aux appels signalés. Les absents sont exclus du score.";

      const currentRank = (state.currentMeasure - 1) * 4 + state.currentBeat;
      const stateCounts = { playing: 0, silent: 0, cued: 0, absent: 0 };
      orchestraDesksLayer.querySelectorAll(".desk-node").forEach(desk => {
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
        orchestraInfo.textContent = `Comptage préparatoire ${state.countInBeat + 1}/4 — les appels arrivent après la levée.`;
      } else if (simulation.active && simulation.pendingCue) {
        const cue = simulation.pendingCue;
        const remaining = cue.groups
          .filter(groupId => !cue.hitGroups.includes(groupId))
          .map(groupId => getOrchestraGroup(groupId).name);
        const beatsUntilCue = Math.max(0, cue.rank - currentRank);
        const timing = beatsUntilCue === 0 ? "maintenant" : `dans ${beatsUntilCue} temps`;
        const prompt = `À préparer ${timing} — ${cue.label} : ${remaining.join(", ")}.`;
        orchestraInfo.textContent = simulation.message.startsWith("Trop tôt")
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
          orchestraInfo.textContent = `Mesure ${state.currentMeasure} — ${counts}.${cueMessage}`;
        } else {
          orchestraInfo.textContent = simulation.message;
        }
      }
    }

    function updateSimulationPosition() {
      if (!simulation.active || state.isCountIn) {
        updateSimulationUI();
        return;
      }
      const rank = (state.currentMeasure - 1) * 4 + state.currentBeat;

      if (simulation.pendingCue && rank >= simulation.pendingCue.rank) {
        const missed = simulation.pendingCue.groups.length - simulation.pendingCue.hitGroups.length;
        simulation.misses += missed;
        simulation.message = missed
          ? `Trop tard pour « ${simulation.pendingCue.label} » : ${missed} départ${missed > 1 ? "s" : ""} oublié${missed > 1 ? "s" : ""}.`
          : `Départ donné : ${simulation.pendingCue.label}.`;
        simulation.pendingCue = null;
        simulation.cueIndex++;
      }

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

    function handleOrchestraGroupTap(group) {
      if (group.active === false) return;
      if (!simulation.active) {
        orchestraInfo.textContent = `${group.name} • ${group.family} • ${getGroupClockPosition(group)}. Faites glisser ce pupitre pour modifier son placement.`;
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

    function finishSimulation(message) {
      if (!simulation.active) return;
      simulation.active = false;
      simulation.finished = true;
      simulation.pendingCue = null;
      const expected = simulation.cues.reduce((total, cue) => total + cue.groups.length, 0);
      const accuracy = expected ? Math.round(simulation.hits / expected * 100) : 0;
      simulation.message = `${message} Réussite : ${simulation.hits}/${expected} départs (${accuracy} %), ${simulation.misses} oubliés et ${simulation.errors} erreurs.`;
      renderOrchestraControls();
      updateSimulationUI();
    }

    function startOrStopSimulation() {
      if (simulation.active) {
        finishSimulation("Simulation arrêtée.");
        pausePlayback();
        return;
      }

      if (!ORCHESTRA_GROUPS.some(group => group.active !== false)) {
        showToast("Sélectionnez au moins un pupitre présent.");
        return;
      }

      const cues = SIMULATION_CUES
        .map(cue => ({ ...cue, groups: cue.groups.filter(groupId => getOrchestraGroup(groupId).active !== false) }))
        .filter(cue => cue.groups.length > 0);
      if (!cues.length) {
        showToast("Aucun départ annoté ne concerne les pupitres présents.");
        return;
      }

      if (state.isPlaying) pausePlayback();
      simulation.active = true;
      simulation.finished = false;
      simulation.cueIndex = 0;
      simulation.pendingCue = null;
      simulation.cues = cues;
      simulation.hits = 0;
      simulation.misses = 0;
      simulation.errors = 0;
      state.currentMeasure = 1;
      state.currentBeat = 0;
      state.beatProgress = 0;
      renderOrchestraControls();
      updateSimulationUI("Répétition prête : préparez le premier départ.");
      startPlayback();
    }

    // =========================================================================
    // 4. INITIALISATION DES BOUTONS DE SECTIONS & DU CONDUCTEUR 62 MESURES
    // =========================================================================
    function renderSectionPills() {
      sectionPillsRow.innerHTML = "";
      SECTIONS.forEach(sec => {
        const btn = document.createElement("button");
        btn.className = "pill-btn";
        btn.dataset.secId = sec.id;
        btn.textContent = sec.label;
        btn.addEventListener("click", () => {
          jumpToMeasure(sec.start, false);
        });
        sectionPillsRow.appendChild(btn);
      });
    }

    function renderScoreList() {
      scoreListContainer.innerHTML = "";
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
        scoreListContainer.appendChild(row);
      });
    }

    // =========================================================================
    // 5. MISE À JOUR DE L'INTERFACE SYNCHRONISÉE
    // =========================================================================
    const EXERCISE_HISTORY_KEY = "chef-orchestre.exercise-history.v1";

    function getExerciseHistory() {
      try {
        const parsed = JSON.parse(localStorage.getItem(EXERCISE_HISTORY_KEY) || "[]");
        return Array.isArray(parsed) ? parsed : [];
      } catch (error) {
        return [];
      }
    }

    function renderExerciseHistory() {
      const history = getExerciseHistory();
      if (!history.length) {
        exerciseHistorySummary.textContent = "Aucune session enregistrée.";
        exerciseHistoryList.innerHTML = '<div class="exercise-history-empty">Terminez un exercice pour créer votre premier repère.</div>';
        return;
      }

      const average = Math.round(history.reduce((sum, item) => sum + item.score, 0) / history.length);
      const best = Math.max(...history.map(item => item.best));
      exerciseHistorySummary.textContent = `${history.length} session${history.length > 1 ? "s" : ""} • moyenne ${average}/100 • meilleur tap ${best}/100`;
      exerciseHistoryList.innerHTML = history.slice(0, 12).map(item => {
        const date = new Date(item.date);
        const label = Number.isNaN(date.getTime()) ? "Session" : date.toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" });
        return `<div class="exercise-history-row"><span>${label} · ${item.attempts} taps</span><strong>${item.score}/100</strong><span>max ${item.best}</span></div>`;
      }).join("");
    }

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

    function finishExerciseSession() {
      if (!exercise.active) return;
      saveExerciseSession();
      exercise.active = false;
      updateExerciseUI();
    }

    function updateExerciseUI() {
      if (!exercise.attempts) {
        exerciseScore.textContent = "—";
      } else {
        exerciseScore.textContent = `${Math.round(exercise.totalScore / exercise.attempts)}/100`;
      }
      exerciseBestScore.textContent = exercise.bestScore ? `${exercise.bestScore}` : "—";
      exerciseStreak.textContent = exercise.streak;
      exerciseTapBtn.disabled = !exercise.active;
      exerciseTapBtn.classList.toggle("active", exercise.active);
      if (!exercise.active) {
        exerciseTapBtn.classList.remove("on-time", "early", "late");
        exerciseLiveFeedback.className = "exercise-live-feedback";
        exerciseLiveFeedback.textContent = "—";
      }
      startExerciseBtn.textContent = exercise.active ? "Arrêter l’exercice" : "Démarrer l’exercice";
    }

    function startOrStopExercise() {
      if (exercise.active) {
        saveExerciseSession();
        exercise.active = false;
        exerciseStatus.textContent = `Exercice arrêté — moyenne ${exercise.attempts ? Math.round(exercise.totalScore / exercise.attempts) : 0}/100.`;
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
      exerciseStatus.textContent = state.isPlaying
        ? `Préparez-vous… premier battement dans ${Math.round(untilNextBeat)} ms.`
        : `Préparation de 4 temps… tempo cible : ${Math.round(state.bpm * state.speed)} BPM.`;
      if (!state.isPlaying) startPlayback();
      updateExerciseUI();
    }

    function updateExerciseLiveFeedback(now) {
      if (!exercise.active) return;
      if (now < exercise.startAt) {
        exerciseLiveFeedback.className = "exercise-live-feedback";
        exerciseLiveFeedback.textContent = `Départ dans ${Math.max(0, ((exercise.startAt - now) / 1000)).toFixed(1)} s`;
        exerciseTapBtn.classList.remove("on-time", "early", "late");
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
      exerciseLiveFeedback.className = `exercise-live-feedback ${className}`;
      exerciseLiveFeedback.textContent = label;
      exerciseTapBtn.classList.remove("on-time", "early", "late");
      exerciseTapBtn.classList.add(className);
    }

    function scoreExerciseTap() {
      if (!exercise.active) return;
      const now = performance.now();
      if (now < exercise.startAt) {
        exerciseStatus.textContent = `Attendez le départ… ${Math.ceil((exercise.startAt - now) / 1000)} s.`;
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
      exerciseLastError.textContent = `${errorMs >= 0 ? "+" : ""}${Math.round(errorMs)} ms`;
      exerciseStatus.textContent = score >= 90
        ? `Excellent — ${score}/100 (${errorMs >= 0 ? "en retard" : "en avance"}).`
        : score >= 70
          ? `Bon geste — ${score}/100, resserrez légèrement le ${errorMs >= 0 ? "retard" : "avance"}.`
          : `À corriger — ${score}/100, écart de ${Math.round(absError)} ms.`;
      updateExerciseUI();
      updateExerciseLiveFeedback(performance.now());
    }

    function renderDetailView() {
      const m = state.currentMeasure;
      const mInfo = SCORE_DATA[m - 1];
      const normalizedDyn = mInfo.dyn.toLowerCase().split(/\s|\/|→|</)[0];
      const intensity = { ppp: 12, pp: 20, p: 30, mp: 42, mf: 55, f: 70, ff: 84, fff: 100 }[normalizedDyn] || 45;
      const nuanceText = {
        ppp: "Très retenu : geste petit, calme et proche du corps.",
        pp: "Très doux : garder de l’espace et éviter toute pression.",
        p: "Doux : donner une impulsion claire sans élargir inutilement.",
        mp: "Modéré : geste souple, stable et respiré.",
        mf: "Assez soutenu : ouvrir progressivement le geste et porter la phrase.",
        f: "Fort : battue large, ancrée et très lisible pour les pupitres.",
        ff: "Très fort : amplitude importante, énergie précise et regard panoramique.",
        fff: "Maximum : geste ample, autoritaire, puis préparer clairement la coupure."
      }[normalizedDyn] || "Adapter l’amplitude à la nuance et à la phrase musicale.";
      const cue = MAJOR_CUES.find(c => c.measure === m);
      const nextCue = MAJOR_CUES.find(c => c.measure > m);

      detailMeasureTitle.textContent = `Mesure ${m}`;
      detailSectionText.textContent = `${mInfo.section} • Temps ${state.currentBeat + 1}/4`;
      detailDynValue.textContent = mInfo.dyn;
      detailDynFill.style.width = `${intensity}%`;
      detailNuanceText.textContent = nuanceText;
      detailActionText.textContent = mInfo.action;
      detailGestureTitle.textContent = mInfo.lhTitle;
      detailGestureDesc.textContent = mInfo.lhDesc;
      detailHandIcon.textContent = mInfo.lhLevel >= 80 ? "✋" : (mInfo.lhLevel >= 45 ? "🫱" : "🤚");
      detailCueText.textContent = cue ? cue.text : "Pas de départ critique signalé ici : maintenir l’écoute et préparer la phrase suivante.";
      detailInstrumentsText.textContent = mInfo.instruments;
      detailNextText.textContent = nextCue ? `Prochain repère : ${nextCue.text}` : "Dernier repère : préparer la coupure nette de la mesure 62.";
      detailTempoText.textContent = `${Math.round(state.bpm * state.speed)} BPM`;
    }

    function updateUI(autoScroll = true) {
      const m = state.currentMeasure;
      const mInfo = SCORE_DATA[m - 1];
      updateSimulationPosition();

      // Scrubber & BPM
      measureSlider.value = m;
      scrubberLabel.textContent = m;
      bpmLabel.textContent = `${Math.round(state.bpm * state.speed)} BPM`;

      // Points de temps (1, 2, 3, 4)
      const activeBeatNum = state.isCountIn ? (state.countInBeat + 1) : (state.currentBeat + 1);
      beatDots.forEach(dot => {
        const b = parseInt(dot.dataset.dot, 10);
        dot.classList.toggle("active", b === activeBeatNum);
      });

      // Overlay Levée
      if (state.isCountIn) {
        countInOverlay.classList.remove("hidden");
        countInNum.textContent = state.countInBeat + 1;
        countInHint.textContent = state.countInBeat === 3
          ? "4 = LEVÉE VERS LE HAUT -> Temps 1 arrive !"
          : "Préparez votre geste à 4 temps...";
      } else {
        countInOverlay.classList.add("hidden");
      }

      // Main Droite & Main Gauche
      const modeNames = ["", "Petite & précise (ppp)", "Souple & régulière (mp)", "Large & appuyée (f)", "Très ample (ff/fff)", "Tenue & Coupure !"];
      rightHandMode.textContent = modeNames[mInfo.amp] || "Battue 4/4";
      ampTag.textContent = `Nuance : ${mInfo.dyn}`;

      dynamicBadge.textContent = mInfo.dyn;
      lhGaugeFill.style.height = `${mInfo.lhLevel}%`;
      lhGestureTitle.textContent = mInfo.lhTitle;
      lhGestureDesc.textContent = mInfo.lhDesc;
      renderDetailView();

      // Prompteur
      prompterMeasure.textContent = `Mes. ${m}/62 • ${mInfo.section}`;
      actionNowText.textContent = mInfo.action;

      // Prochain départ critique
      const currentRank = (m - 1) * 4 + state.currentBeat;
      const cueCandidates = simulation.active
        ? simulation.cues.slice(simulation.cueIndex)
        : SIMULATION_CUES.filter(cue =>
          cue.groups.some(groupId => getOrchestraGroup(groupId).active !== false)
        );
      const nextCue = cueCandidates.find(cue => getCueRank(cue) >= currentRank);
      if (simulation.active && state.isCountIn) {
        nextCueChip.textContent = `Levée · ${state.countInBeat + 1}/4`;
        nextCueText.textContent = "Premier appel après le comptage.";
      } else if (nextCue) {
        const beatsUntilCue = getCueRank(nextCue) - currentRank;
        const isPendingCue = simulation.pendingCue && getCueRank(simulation.pendingCue) === getCueRank(nextCue);
        const groupsToCall = isPendingCue
          ? nextCue.groups.filter(groupId => !simulation.pendingCue.hitGroups.includes(groupId))
          : nextCue.groups.filter(groupId => getOrchestraGroup(groupId).active !== false);
        nextCueChip.textContent = beatsUntilCue <= CUE_NOTICE_LEAD_BEATS
          ? (beatsUntilCue === 0 ? "À appeler !" : `Préparer · ${beatsUntilCue} temps`)
          : `Mesure ${nextCue.measure}`;
        nextCueText.textContent = `Mes. ${nextCue.measure} — ${nextCue.label}${groupsToCall.length ? ` : ${groupsToCall.map(groupId => getOrchestraGroup(groupId).name).join(", ")}` : ""}`;
      } else {
        nextCueChip.textContent = "Fin du morceau";
        nextCueText.textContent = "Mes. 62 : Coupure nette sur le 4e temps !";
      }

      // Surlignage pilule section active
      const activeSec = SECTIONS.find(s => m >= s.start && m <= s.end);
      document.querySelectorAll(".pill-btn").forEach(btn => {
        btn.classList.toggle("active", activeSec && btn.dataset.secId === activeSec.id);
      });

      // Surlignage ligne conducteur + défilement isolé
      document.querySelectorAll(".measure-row.active-measure").forEach(el => el.classList.remove("active-measure"));
      const activeRow = document.getElementById(`m-row-${m}`);
      if (activeRow) {
        activeRow.classList.add("active-measure");
        if (autoScroll) {
          const targetScroll = activeRow.offsetTop - scoreListContainer.offsetTop - (scoreListContainer.clientHeight * 0.35);
          scoreListContainer.scrollTo({
            top: Math.max(0, targetScroll),
            behavior: "smooth"
          });
        }
      }
    }

    // =========================================================================
    // 6. DESSIN ANIMÉ DE LA MAIN DROITE (BATTUE OFFICIELLE À 4 TEMPS)
    // =========================================================================
    function resizeCanvas() {
      const rect = canvasBox.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(10, Math.floor(rect.width * dpr));
      canvas.height = Math.max(10, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    window.addEventListener("resize", resizeCanvas);

    function getAnchors(w, h, amp) {
      const cx = w * 0.5;
      const cy = h * 0.52;
      const scaleArr = [0, 0.55, 0.72, 0.88, 1.02, 0.80];
      const s = scaleArr[amp] || 0.72;
      const rx = Math.min(w * 0.36, 130) * s;
      const ry = Math.min(h * 0.36, 85) * s;

      return {
        p1: { x: cx, y: cy + ry * 0.85, label: "1 Bas" },          // Temps 1 : Bas
        p2: { x: cx - rx * 0.88, y: cy + ry * 0.12, label: "2 Gauche" }, // Temps 2 : Gauche (intérieur)
        p3: { x: cx + rx * 0.92, y: cy + ry * 0.12, label: "3 Droite" }, // Temps 3 : Droite (extérieur)
        p4: { x: cx, y: cy - ry * 0.92, label: "4 Haut" }           // Temps 4 : Haut (levée)
      };
    }

    function drawConductingCanvas() {
      const rect = canvasBox.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      if (w < 10 || h < 10) return;

      ctx.clearRect(0, 0, w, h);

      const mInfo = SCORE_DATA[state.currentMeasure - 1];
      const amp = state.isCountIn ? 2 : mInfo.amp;
      const pts = getAnchors(w, h, amp);

      const beatIdx = state.isCountIn ? state.countInBeat : state.currentBeat;
      const t = state.beatProgress;

      // Couleur selon nuance
      const strokeColor = amp === 1 ? "#38bdf8" : (amp === 2 ? "#34d399" : (amp === 3 ? "#a96873" : "#bd828b"));

      // Cas spécial : Tenue finale m.61-62
      if (!state.isCountIn && state.currentMeasure >= 61) {
        const isCut = state.currentMeasure === 62 && beatIdx === 3 && t > 0.35;
        const holdX = isCut ? w * 0.72 : w * 0.5;
        const holdY = isCut ? h * 0.30 : h * 0.45;

        ctx.save();
        ctx.strokeStyle = "#bd828b";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(w * 0.5, h * 0.45, 22 + Math.sin(t * Math.PI * 2) * 4, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 12px system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(isCut ? "✂ COUPURE NETTE !" : "TENUE fp < fff", w * 0.5, h * 0.78);

        ctx.beginPath();
        ctx.arc(holdX, holdY, 8, 0, Math.PI * 2);
        ctx.fillStyle = "#a96873";
        ctx.fill();
        ctx.restore();
        return;
      }

      // 1. Tracé guide de la figure à 4 temps
      ctx.save();
      ctx.strokeStyle = "rgba(148, 163, 184, 0.25)";
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(pts.p4.x, pts.p4.y);
      ctx.lineTo(pts.p1.x, pts.p1.y);
      ctx.lineTo(pts.p2.x, pts.p2.y);
      ctx.lineTo(pts.p3.x, pts.p3.y);
      ctx.lineTo(pts.p4.x, pts.p4.y);
      ctx.stroke();
      ctx.setLineDash([]);

      // Points d'impact (Ictus 1, 2, 3, 4)
      const order = [pts.p1, pts.p2, pts.p3, pts.p4];
      order.forEach((pt, idx) => {
        const isCurrent = idx === beatIdx;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, isCurrent ? 6 : 4, 0, Math.PI * 2);
        ctx.fillStyle = isCurrent ? strokeColor : "rgba(148, 163, 184, 0.45)";
        ctx.fill();

        ctx.fillStyle = isCurrent ? "#ffffff" : "#94a3b8";
        ctx.font = isCurrent ? "bold 10px system-ui, sans-serif" : "10px system-ui, sans-serif";
        ctx.textAlign = "center";
        const offsetY = idx === 0 ? 15 : (idx === 3 ? -10 : -9);
        ctx.fillText(pt.label, pt.x, pt.y + offsetY);
      });
      ctx.restore();

      // 2. Calcul de la trajectoire courbe avec rebond (ictus) entre le temps actuel et le suivant
      const startPt = order[beatIdx];
      const endPt = order[(beatIdx + 1) % 4];
      const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      const bounce = Math.sin(t * Math.PI) * 16;

      const tipX = startPt.x + (endPt.x - startPt.x) * ease;
      const tipY = startPt.y + (endPt.y - startPt.y) * ease - bounce;

      // Onde lumineuse sur l'ictus au début du temps
      if (state.ictusFlash > 0.02) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(startPt.x, startPt.y, (1 - state.ictusFlash) * 26 + 5, 0, Math.PI * 2);
        ctx.strokeStyle = strokeColor;
        ctx.globalAlpha = state.ictusFlash * 0.8;
        ctx.lineWidth = 2.5;
        ctx.stroke();
        ctx.restore();
      }

      // 3. Baguette & Pointe lumineuse de la Main Droite
      const wristX = w * 0.52;
      const wristY = h * 0.92;
      ctx.save();
      ctx.strokeStyle = "rgba(248, 250, 252, 0.75)";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(wristX, wristY);
      ctx.lineTo(tipX, tipY);
      ctx.stroke();

      // Pointe lumineuse
      ctx.beginPath();
      ctx.arc(tipX, tipY, 7, 0, Math.PI * 2);
      ctx.fillStyle = strokeColor;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#ffffff";
      ctx.stroke();
      ctx.restore();
    }

    // =========================================================================
    // 7. CONTRÔLE DE LECTURE & BOUCLE TEMPS RÉEL
    // =========================================================================
    function triggerBeat(measure, beatIndex, isCountIn) {
      state.ictusFlash = 1.0;

      // L’audio est un accompagnement : aucune erreur audio ne doit empêcher
      // l’horloge visuelle et les indications de direction de progresser.
      try {
        audioEngine.playClick(beatIndex, isCountIn);
        if (!isCountIn) {
          audioEngine.playOrchestraBeat(measure, beatIndex, state.speed);
          if (beatIndex === 0) {
            audioEngine.syncCustomAudio(measure, state.speed, true);
          }
        }
      } catch (error) {
        console.warn("Audio indisponible ; la partition et la battue continuent.", error);
      }

      updateUI(beatIndex === 0 && !isCountIn);
    }

    function startPlayback() {
      // L’animation doit rester fonctionnelle même si Web Audio est bloqué
      // (webview mobile, permission audio ou navigateur non compatible).
      if (!simulation.active) {
        simulation.finished = false;
        simulation.message = "La carte des entrées suit la mesure active du conducteur.";
      }
      state.isPlaying = true;
      audioEngine.init();
      iconPlay.classList.add("hidden");
      iconPause.classList.remove("hidden");
      playBtnText.textContent = "Pause";

      // Si on démarre à la mesure 1, on fait d'abord les 4 temps de levée (préparation)
      if (state.currentMeasure === 1 && state.currentBeat === 0 && state.beatProgress === 0 && !audioEngine.hasCustomFile) {
        state.isCountIn = true;
        state.countInBeat = 0;
        triggerBeat(1, 0, true);
      } else {
        state.isCountIn = false;
        triggerBeat(state.currentMeasure, state.currentBeat, false);
      }
      audioEngine.syncCustomAudio(state.currentMeasure, state.speed, true, true);
      // La boucle utilisera la même horloge monotone que les callbacks suivants.
      state.lastTime = 0;
    }

    function pausePlayback() {
      state.isPlaying = false;
      state.isCountIn = false;
      iconPlay.classList.remove("hidden");
      iconPause.classList.add("hidden");
      playBtnText.textContent = "Reprendre";
      audioEngine.syncCustomAudio(state.currentMeasure, state.speed, false);
      updateUI(false);
    }

    function resetPlayback(simulationEndMessage = "Simulation interrompue.") {
      const interruptedSimulation = simulation.active;
      state.currentMeasure = 1;
      state.currentBeat = 0;
      state.beatProgress = 0;
      finishSimulation(simulationEndMessage);
      if (!interruptedSimulation) {
        simulation.finished = false;
        simulation.message = "La carte des entrées suit la mesure active du conducteur.";
      }
      pausePlayback();
      playBtnText.textContent = "Démarrer (Levée)";
      audioEngine.syncCustomAudio(1, state.speed, false, true);
      updateUI(true);
    }

    function jumpToMeasure(targetMeasure, autoStart = false) {
      const interruptedSimulation = simulation.active;
      if (interruptedSimulation) {
        finishSimulation("Simulation interrompue par un déplacement dans le conducteur.");
        pausePlayback();
      } else {
        simulation.finished = false;
        simulation.message = "La carte des entrées suit la mesure active du conducteur.";
      }
      state.currentMeasure = Math.max(1, Math.min(TOTAL_MEASURES, targetMeasure));
      state.currentBeat = 0;
      state.beatProgress = 0;
      state.isCountIn = false;
      if (autoStart && !state.isPlaying) {
        startPlayback();
      } else if (state.isPlaying) {
        audioEngine.syncCustomAudio(state.currentMeasure, state.speed, true, true);
        triggerBeat(state.currentMeasure, 0, false);
      } else {
        updateUI(true);
      }
    }

    function updateStateFromCustomAudio() {
      const audio = audioEngine.customAudio;
      if (!audio || !audioEngine.customAudioReady || !Number.isFinite(audio.currentTime)) return false;

      // Le BPM effectif tient compte du tempo de référence et du multiplicateur 70/85/100 %.
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

    function animationLoop() {
      // Utiliser performance.now() partout évite les écarts de base temporelle
      // entre le timestamp requestAnimationFrame et les actions utilisateur.
      const now = performance.now();
      const dt = state.lastTime ? Math.min(0.1, Math.max(0, (now - state.lastTime) / 1000)) : 0;
      state.lastTime = now;

      if (state.ictusFlash > 0) {
        state.ictusFlash = Math.max(0, state.ictusFlash - dt * 2.8);
      }
      updateExerciseLiveFeedback(now);

      if (state.isPlaying) {
        const hasCustomAudio = audioEngine.hasCustomFile && audioEngine.customAudio;
        if (hasCustomAudio && audioEngine.customAudio.ended) {
          finishSimulation("Simulation arrêtée à la fin de l’enregistrement.");
          pausePlayback();
          showToast("Fin de l’audio personnalisé.");
        } else if (hasCustomAudio && !audioEngine.customAudio.paused && updateStateFromCustomAudio()) {
          // MP3 maître : la boucle interne ne modifie pas la position musicale.
        } else {
          // Repli pendant le chargement ou si le navigateur refuse play().
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

    // =========================================================================
    // 8. ÉVÉNEMENTS UTILISATEUR
    // =========================================================================
    playPauseBtn.addEventListener("click", () => {
      if (state.isPlaying) pausePlayback();
      else startPlayback();
    });

    resetBtn.addEventListener("click", () => resetPlayback());

    document.addEventListener("keydown", (event) => {
      const target = event.target;
      const isTyping = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      if (event.code === "Space" && !isTyping && exercise.active) {
        event.preventDefault();
        scoreExerciseTap();
      }
    });

    document.querySelectorAll(".speed-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".speed-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.speed = parseFloat(btn.dataset.speed);
        audioEngine.syncCustomAudio(state.currentMeasure, state.speed, state.isPlaying);
        updateUI(false);
      });
    });

    metroBtn.addEventListener("click", () => {
      audioEngine.metronomeOn = !audioEngine.metronomeOn;
      metroText.textContent = audioEngine.metronomeOn ? "ON" : "OFF";
      metroBtn.classList.toggle("btn-toggle-on", audioEngine.metronomeOn);
    });

    loopBtn.addEventListener("click", () => {
      state.loopSection = !state.loopSection;
      loopText.textContent = state.loopSection ? "ON" : "OFF";
      loopBtn.classList.toggle("btn-loop-on", state.loopSection);
      if (state.loopSection) {
        const sec = SECTIONS.find(s => state.currentMeasure >= s.start && state.currentMeasure <= s.end);
        if (sec) showToast(`Boucle activée : ${sec.label} à m.${sec.end}`);
      }
    });

    measureSlider.addEventListener("input", (e) => {
      jumpToMeasure(parseInt(e.target.value, 10), false);
    });

    audioFileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      audioEngine.loadCustomFile(file);
      audioSourceLabel.textContent = file.name.slice(0, 12) + "…";
      clearMp3Btn.classList.remove("hidden");
      audioModeStatus.textContent = "● Audio MP3/WAV local";
      audioModeStatus.style.color = "#a96873";
      showToast("Audio local chargé ! Appuyez sur Démarrer.");
    });

    audioTestBtn.addEventListener("click", () => {
      if (audioEngine.playTestTone()) showToast("Signal test envoyé : vérifiez le volume et l’onglet.");
      else showToast("Le navigateur ne permet pas de produire le signal audio.");
    });

    clearMp3Btn.addEventListener("click", () => {
      audioEngine.clearCustomFile();
      audioFileInput.value = "";
      audioSourceLabel.textContent = "MP3/WAV";
      clearMp3Btn.classList.add("hidden");
      audioModeStatus.textContent = "● Synthé Orchestral ONM";
      audioModeStatus.style.color = "#10b981";
      showToast("Retour au synthétiseur orchestral intégré.");
    });

    openGuideBtn.addEventListener("click", () => guideModal.classList.remove("hidden"));
    closeGuideBtn.addEventListener("click", () => guideModal.classList.add("hidden"));
    guideModal.addEventListener("click", (e) => {
      if (e.target === guideModal) guideModal.classList.add("hidden");
    });

    openDetailBtn.addEventListener("click", () => {
      renderDetailView();
      detailModal.classList.remove("hidden");
    });
    closeDetailBtn.addEventListener("click", () => detailModal.classList.add("hidden"));
    detailModal.addEventListener("click", (e) => {
      if (e.target === detailModal) detailModal.classList.add("hidden");
    });

    openExerciseBtn.addEventListener("click", () => {
      exerciseModal.classList.remove("hidden");
      renderExerciseHistory();
      updateExerciseUI();
    });
    closeExerciseBtn.addEventListener("click", () => {
      finishExerciseSession();
      exerciseModal.classList.add("hidden");
    });
    exerciseModal.addEventListener("click", (e) => {
      if (e.target === exerciseModal) {
        finishExerciseSession();
        exerciseModal.classList.add("hidden");
      }
    });
    startExerciseBtn.addEventListener("click", startOrStopExercise);
    exerciseTapBtn.addEventListener("click", scoreExerciseTap);
    clearExerciseHistoryBtn.addEventListener("click", () => {
      localStorage.removeItem(EXERCISE_HISTORY_KEY);
      renderExerciseHistory();
      showToast("Historique des exercices effacé.");
    });

    startSimulationBtn.addEventListener("click", startOrStopSimulation);
    restoreOrchestraBtn.addEventListener("click", () => {
      if (simulation.active) return;
      const restoredCount = ORCHESTRA_GROUPS.filter(group => group.active === false).length;
      if (!restoredCount) return;
      ORCHESTRA_GROUPS.forEach(group => { group.active = true; });
      simulation.message = "Tous les pupitres ont été rétablis.";
      renderOrchestraControls();
      renderOrchestraDesks();
      showToast("Tous les pupitres sont de nouveau présents.");
    });

    // =========================================================================
    // 9. DÉMARRAGE AU CHARGEMENT
    // =========================================================================
    window.onload = function () {
      renderSectionPills();
      renderScoreList();
      renderOrchestraControls();
      renderOrchestraDesks();
      resizeCanvas();
      updateUI(false);
      requestAnimationFrame(animationLoop);
    };
