/* ============================================================================
   js/canvas.js — Dessin animé de la main droite (battue officielle à 4 temps)
   ============================================================================ */

/**
 * Redimensionne le canvas pour tenir compte de la densité de pixels (DPR).
 * À appeler au chargement et à chaque changement de taille de fenêtre.
 */
function resizeCanvas() {
  const rect = refs.canvasBox.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  refs.canvas.width = Math.max(10, Math.floor(rect.width * dpr));
  refs.canvas.height = Math.max(10, Math.floor(rect.height * dpr));
  refs.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

/**
 * Calcule les points d'ancrage (ictus) de la figure de battue à 4 temps.
 * @param {number} w - Largeur du canvas
 * @param {number} h - Hauteur du canvas
 * @param {number} amp - Niveau d'amplitude (1 à 5)
 * @returns {Object} Points p1 (bas), p2 (gauche), p3 (droite), p4 (haut) avec coordonnées et labels
 */
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

/**
 * Dessine une frame de l'animation de battue sur le canvas.
 * Cette fonction est appelée à chaque frame par animationLoop().
 */
function drawConductingCanvas() {
  const rect = refs.canvasBox.getBoundingClientRect();
  const w = rect.width;
  const h = rect.height;
  if (w < 10 || h < 10) return;

  refs.ctx.clearRect(0, 0, w, h);

  const mInfo = SCORE_DATA[state.currentMeasure - 1];
  const amp = state.isCountIn ? 2 : mInfo.amp;
  const pts = getAnchors(w, h, amp);

  const beatIdx = state.isCountIn ? state.countInBeat : state.currentBeat;
  const t = state.beatProgress;

  // Couleur du trait selon l'amplitude/nuance
  const strokeColor = amp === 1 ? "#38bdf8" : (amp === 2 ? "#34d399" : (amp === 3 ? "#a96873" : "#bd828b"));

  // Cas spécial : Tenue finale m.61-62
  if (!state.isCountIn && state.currentMeasure >= 61) {
    const isCut = state.currentMeasure === 62 && beatIdx === 3 && t > 0.35;
    const holdX = isCut ? w * 0.72 : w * 0.5;
    const holdY = isCut ? h * 0.30 : h * 0.45;

    refs.ctx.save();
    refs.ctx.strokeStyle = "#bd828b";
    refs.ctx.lineWidth = 3;
    refs.ctx.beginPath();
    refs.ctx.arc(w * 0.5, h * 0.45, 22 + Math.sin(t * Math.PI * 2) * 4, 0, Math.PI * 2);
    refs.ctx.stroke();

    refs.ctx.fillStyle = "#ffffff";
    refs.ctx.font = "bold 12px system-ui, sans-serif";
    refs.ctx.textAlign = "center";
    refs.ctx.fillText(isCut ? "✂ COUPURE NETTE !" : "TENUE fp < fff", w * 0.5, h * 0.78);

    refs.ctx.beginPath();
    refs.ctx.arc(holdX, holdY, 8, 0, Math.PI * 2);
    refs.ctx.fillStyle = "#a96873";
    refs.ctx.fill();
    refs.ctx.restore();
    return;
  }

  // 1. Tracé guide de la figure à 4 temps (lignes pointillées)
  refs.ctx.save();
  refs.ctx.strokeStyle = "rgba(148, 163, 184, 0.25)";
  refs.ctx.lineWidth = 2;
  refs.ctx.setLineDash([4, 4]);
  refs.ctx.beginPath();
  refs.ctx.moveTo(pts.p4.x, pts.p4.y);
  refs.ctx.lineTo(pts.p1.x, pts.p1.y);
  refs.ctx.lineTo(pts.p2.x, pts.p2.y);
  refs.ctx.lineTo(pts.p3.x, pts.p3.y);
  refs.ctx.lineTo(pts.p4.x, pts.p4.y);
  refs.ctx.stroke();
  refs.ctx.setLineDash([]);

  // Points d'impact (Ictus 1, 2, 3, 4)
  const order = [pts.p1, pts.p2, pts.p3, pts.p4];
  order.forEach((pt, idx) => {
    const isCurrent = idx === beatIdx;
    refs.ctx.beginPath();
    refs.ctx.arc(pt.x, pt.y, isCurrent ? 6 : 4, 0, Math.PI * 2);
    refs.ctx.fillStyle = isCurrent ? strokeColor : "rgba(148, 163, 184, 0.45)";
    refs.ctx.fill();

    refs.ctx.fillStyle = isCurrent ? "#ffffff" : "#94a3b8";
    refs.ctx.font = isCurrent ? "bold 10px system-ui, sans-serif" : "10px system-ui, sans-serif";
    refs.ctx.textAlign = "center";
    const offsetY = idx === 0 ? 15 : (idx === 3 ? -10 : -9);
    refs.ctx.fillText(pt.label, pt.x, pt.y + offsetY);
  });
  refs.ctx.restore();

  // 2. Calcul de la trajectoire courbe avec rebond (ictus) entre le temps actuel et le suivant
  const startPt = order[beatIdx];
  const endPt = order[(beatIdx + 1) % 4];
  const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  const bounce = Math.sin(t * Math.PI) * 16;

  const tipX = startPt.x + (endPt.x - startPt.x) * ease;
  const tipY = startPt.y + (endPt.y - startPt.y) * ease - bounce;

  // Onde lumineuse sur l'ictus au début du temps
  if (state.ictusFlash > 0.02) {
    refs.ctx.save();
    refs.ctx.beginPath();
    refs.ctx.arc(startPt.x, startPt.y, (1 - state.ictusFlash) * 26 + 5, 0, Math.PI * 2);
    refs.ctx.strokeStyle = strokeColor;
    refs.ctx.globalAlpha = state.ictusFlash * 0.8;
    refs.ctx.lineWidth = 2.5;
    refs.ctx.stroke();
    refs.ctx.restore();
  }

  // 3. Baguette & Pointe lumineuse de la Main Droite
  const wristX = w * 0.52;
  const wristY = h * 0.92;
  refs.ctx.save();
  refs.ctx.strokeStyle = "rgba(248, 250, 252, 0.75)";
  refs.ctx.lineWidth = 3;
  refs.ctx.lineCap = "round";
  refs.ctx.beginPath();
  refs.ctx.moveTo(wristX, wristY);
  refs.ctx.lineTo(tipX, tipY);
  refs.ctx.stroke();

  // Pointe lumineuse
  refs.ctx.beginPath();
  refs.ctx.arc(tipX, tipY, 7, 0, Math.PI * 2);
  refs.ctx.fillStyle = strokeColor;
  refs.ctx.fill();
  refs.ctx.lineWidth = 2;
  refs.ctx.strokeStyle = "#ffffff";
  refs.ctx.stroke();
  refs.ctx.restore();
}

// Redimensionner le canvas quand la fenêtre change de taille
window.addEventListener("resize", resizeCanvas);