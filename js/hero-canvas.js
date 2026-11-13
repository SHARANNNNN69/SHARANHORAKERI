/**
 * ====================================================================
 * HERO INTERACTIVE 3D CANVAS & AFTER HOURS EXPERIMENT
 * 3D Neural Lattice • Interactive Mouse Physics • Zero Cartoon Photos
 * ====================================================================
 */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    initHero3DCanvas();
    initLiveClock();
  });

  /* --------------------------------------------------------------------
   * -------------------------------------------------------------------- */
  function initHero3DCanvas() {
    const canvas = document.getElementById("hero-interactive-canvas");
    const container = document.getElementById("hero");
    const hudHint = document.getElementById("hud-drag-hint");
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = Math.max(rect.height, 600);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener("resize", resize);

    // Generate 3D Geodesic / Neural Nodes distributed on a sphere
    const nodeCount = 52;
    const radius = Math.min(width, height) * 0.28;
    const nodes = [];
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < nodeCount; i++) {
      const theta = 2 * Math.PI * i / goldenRatio;
      const phi = Math.acos(1 - 2 * (i + 0.5) / nodeCount);
      const x = Math.sin(phi) * Math.cos(theta);
      const y = Math.sin(phi) * Math.sin(theta);
      const z = Math.cos(phi);

      nodes.push({
        origX: x * radius,
        origY: y * radius,
        origZ: z * radius,
        x: 0,
        y: 0,
        z: 0,
        screenX: 0,
        screenY: 0,
        scale: 1,
        isHighlight: i % 7 === 0 || i % 11 === 0
      });
    }

    // Connect edges based on 3D distance
    const edges = [];
    const maxDist = radius * 0.72;
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = nodes[i].origX - nodes[j].origX;
        const dy = nodes[i].origY - nodes[j].origY;
        const dz = nodes[i].origZ - nodes[j].origZ;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < maxDist) {
          edges.push([i, j, dist]);
        }
      }
    }

    // 3D Orbital Rings (Gyroscope effect)
    const ringPoints = [];
    const ringPointCount = 36;
    for (let i = 0; i < ringPointCount; i++) {
      const angle = (i / ringPointCount) * Math.PI * 2;
      ringPoints.push({
        origX: Math.cos(angle) * (radius * 1.25),
        origY: Math.sin(angle) * (radius * 1.25),
        origZ: 0
      });
    }

    // Physics & Rotation State
    let rotX = 0.2;
    let rotY = 0.3;
    let rotZ = 0.05;
    let velX = 0.002;
    let velY = 0.004;
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;

    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    // Mouse movement inside Hero for gentle tilt
    container.addEventListener("mousemove", (e) => {
      const rect = container.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetTiltX = ny * 0.45;
      targetTiltY = nx * 0.45;

      if (isDragging) {
        const deltaX = e.clientX - lastMouseX;
        const deltaY = e.clientY - lastMouseY;
        velY = deltaX * 0.006;
        velX = -deltaY * 0.006;
        rotY += velY;
        rotX += velX;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
      }
    });

    // Drag to rotate on canvas
    container.addEventListener("mousedown", (e) => {
      // Don't drag if clicking buttons, links, or inputs
      if (e.target.closest("a, button, input")) return;
      isDragging = true;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    });

    window.addEventListener("mouseup", () => {
      isDragging = false;
    });

    // Touch support for mobile
    container.addEventListener("touchstart", (e) => {
      if (e.target.closest("a, button, input")) return;
      if (e.touches.length === 1) {
        isDragging = true;
        lastMouseX = e.touches[0].clientX;
        lastMouseY = e.touches[0].clientY;
      }
    }, { passive: true });

    container.addEventListener("touchmove", (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - lastMouseX;
      const deltaY = e.touches[0].clientY - lastMouseY;
      velY = deltaX * 0.006;
      velX = -deltaY * 0.006;
      rotY += velY;
      rotX += velX;
      lastMouseX = e.touches[0].clientX;
      lastMouseY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener("touchend", () => {
      isDragging = false;
    });

    // Animation Loop
    let animId;
    function render() {
      ctx.clearRect(0, 0, width, height);

      // Inertia & Auto-spin
      if (!isDragging) {
        velX *= 0.96;
        velY *= 0.96;
        rotX += velX + 0.0015;
        rotY += velY + 0.0035;
      }

      currentTiltX += (targetTiltX - currentTiltX) * 0.05;
      currentTiltY += (targetTiltY - currentTiltY) * 0.05;

      const finalRotX = rotX + currentTiltX;
      const finalRotY = rotY + currentTiltY;

      // Update HUD stats occasionally
      if (hudHint && Math.random() < 0.04) {
        const degX = Math.round(((finalRotX % (Math.PI * 2)) * 180) / Math.PI);
        const degY = Math.round(((finalRotY % (Math.PI * 2)) * 180) / Math.PI);
        hudHint.textContent = `3D MESH // X: ${degX}° Y: ${degY}°`;
      }

      // Center of 3D object (positioned slightly to the right of center for nice balance with text)
      const centerX = width > 900 ? width * 0.62 : width * 0.5;
      const centerY = height * 0.48;
      const fov = 420;

      // Trig for Rotation
      const cosX = Math.cos(finalRotX);
      const sinX = Math.sin(finalRotX);
      const cosY = Math.cos(finalRotY);
      const sinY = Math.sin(finalRotY);

      // Project all nodes
      for (let i = 0; i < nodeCount; i++) {
        const n = nodes[i];

        // Rotate Y
        let x1 = n.origX * cosY + n.origZ * sinY;
        let z1 = -n.origX * sinY + n.origZ * cosY;

        // Rotate X
        let y2 = n.origY * cosX - z1 * sinX;
        let z2 = n.origY * sinX + z1 * cosX;

        n.x = x1;
        n.y = y2;
        n.z = z2;

        const scale = fov / (fov + z2);
        n.scale = scale;
        n.screenX = centerX + x1 * scale;
        n.screenY = centerY + y2 * scale;
      }

      // 1. Draw 3D Edges
      for (let k = 0; k < edges.length; k++) {
        const [i, j] = edges[k];
        const n1 = nodes[i];
        const n2 = nodes[j];

        // Depth cue opacity
        const avgZ = (n1.z + n2.z) / 2;
        const normZ = (avgZ + radius) / (radius * 2);
        const depthAlpha = Math.max(0.04, Math.min(0.65, normZ * 0.7));

        ctx.beginPath();
        ctx.moveTo(n1.screenX, n1.screenY);
        ctx.lineTo(n2.screenX, n2.screenY);

        // Highlight lines in cinnabar red, others in subtle ink
        if (n1.isHighlight || n2.isHighlight) {
          ctx.strokeStyle = `rgba(227, 53, 41, ${depthAlpha * 1.1})`;
          ctx.lineWidth = 1.3 * ((n1.scale + n2.scale) / 2);
        } else {
          ctx.strokeStyle = `rgba(28, 27, 26, ${depthAlpha * 0.45})`;
          ctx.lineWidth = 0.9 * ((n1.scale + n2.scale) / 2);
        }
        ctx.stroke();
      }

      // 2. Draw 3D Orbital Ring
      ctx.beginPath();
      for (let r = 0; r < ringPointCount; r++) {
        const rp = ringPoints[r];
        // Rotate Ring around X and Y
        let rx1 = rp.origX * cosY + rp.origZ * sinY;
        let rz1 = -rp.origX * sinY + rp.origZ * cosY;
        let ry2 = rp.origY * cosX - rz1 * sinX;
        let rz2 = rp.origY * sinX + rz1 * cosX;

        const rScale = fov / (fov + rz2);
        const rScreenX = centerX + rx1 * rScale;
        const rScreenY = centerY + ry2 * rScale;

        if (r === 0) ctx.moveTo(rScreenX, rScreenY);
        else ctx.lineTo(rScreenX, rScreenY);
      }
      ctx.closePath();
      ctx.strokeStyle = "rgba(227, 53, 41, 0.22)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      // 3. Draw Nodes (Points)
      for (let i = 0; i < nodeCount; i++) {
        const n = nodes[i];
        const normZ = (n.z + radius) / (radius * 2);
        const pointAlpha = Math.max(0.15, Math.min(0.95, normZ));

        ctx.beginPath();
        const ptRadius = (n.isHighlight ? 4.2 : 2.4) * n.scale;
        ctx.arc(n.screenX, n.screenY, Math.max(1, ptRadius), 0, Math.PI * 2);

        if (n.isHighlight) {
          ctx.fillStyle = `rgba(227, 53, 41, ${pointAlpha})`;
          ctx.shadowColor = "rgba(227, 53, 41, 0.5)";
          ctx.shadowBlur = 8;
        } else {
          ctx.fillStyle = `rgba(28, 27, 26, ${pointAlpha * 0.75})`;
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    }

    animId = requestAnimationFrame(render);
  }

  /* --------------------------------------------------------------------
   * -------------------------------------------------------------------- */
  function initAfterHoursCanvas() {
    const drawCanvas = document.getElementById("after-hours-draw-canvas");
    const clearBtn = document.getElementById("clear-draw-canvas-btn");
    if (!drawCanvas) return;

    const ctx = drawCanvas.getContext("2d");
    if (!ctx) return;

    let drawing = false;
    let lastX = 0;
    let lastY = 0;

    function resizeDrawCanvas() {
      const parent = drawCanvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      drawCanvas.width = rect.width * dpr;
      drawCanvas.height = 240 * dpr;
      drawCanvas.style.width = rect.width + "px";
      drawCanvas.style.height = "240px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Background watermark
      drawPrompt();
    }

    function drawPrompt() {
      ctx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
      ctx.font = "500 13px 'JetBrains Mono', monospace";
      ctx.fillStyle = "rgba(28, 27, 26, 0.25)";
      ctx.textAlign = "center";
      ctx.fillText("[ DRAG TO DRAW SOMETHING COOL HERE • AFTER HOURS SCRATCHPAD ]", drawCanvas.offsetWidth / 2, 120);
    }

    resizeDrawCanvas();
    window.addEventListener("resize", resizeDrawCanvas);

    function startDraw(e) {
      drawing = true;
      const rect = drawCanvas.getBoundingClientRect();
      lastX = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
      lastY = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;
    }

    function doDraw(e) {
      if (!drawing) return;
      e.preventDefault();
      const rect = drawCanvas.getBoundingClientRect();
      const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
      const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = "#e33529";
      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();

      lastX = x;
      lastY = y;
    }

    function stopDraw() {
      drawing = false;
    }

    drawCanvas.addEventListener("mousedown", startDraw);
    drawCanvas.addEventListener("mousemove", doDraw);
    window.addEventListener("mouseup", stopDraw);

    drawCanvas.addEventListener("touchstart", startDraw, { passive: false });
    drawCanvas.addEventListener("touchmove", doDraw, { passive: false });
    window.addEventListener("touchend", stopDraw);

    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        drawPrompt();
      });
    }
  }

  /* --------------------------------------------------------------------
   * -------------------------------------------------------------------- */
  function initLiveClock() {
    const clockEl = document.getElementById("hero-live-clock");
    if (!clockEl) return;

    function update() {
      try {
        const now = new Date();
        const istTime = now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        });
        clockEl.textContent = `INDIA (IST) ${istTime}`;
      } catch (err) {
        clockEl.textContent = "INDIA (IST) // ONLINE";
      }
    }

    update();
    setInterval(update, 1000);
  }
})();

