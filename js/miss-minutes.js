/**
 * ====================================================================
 * MISS MINUTES TVA COMPANION WIDGET
 * ====================================================================
 * A retro 1950s animated TVA clock assistant that delivers witty advice,
 * tracks temporal timeline clocks, and serves as an interactive Easter egg!
 */

(function () {
  const container = document.getElementById("miss-minutes-widget");
  if (!container) return;

  const quotes = PORTFOLIO_CONFIG.missMinutesQuotes || [
    "Hey y'all! Welcome to the Sacred Portfolio!",
    "Time runs differently here in the TVA... but Sharan's code is always on time!",
    "With great curiosity comes great AI models!",
    "Looking for a passionate 2nd-year AI engineer? You found the right variant!"
  ];

  let currentQuoteIndex = 0;
  let isMinimized = false;

  // Render Widget HTML
  container.innerHTML = `
    <div class="mm-bubble" id="mm-bubble" role="status" aria-live="polite">
      <div class="mm-bubble-header">
        <span class="mm-tva-badge">TVA AI AGENT</span>
        <span class="mm-time" id="mm-live-clock">--:--:--</span>
      </div>
      <p class="mm-bubble-text" id="mm-quote-text">${quotes[0]}</p>
      <div class="mm-bubble-actions">
        <button class="mm-btn mm-btn-next" id="mm-next-quote" title="Ask Miss Minutes another tip">New Tip ⚡</button>
        <button class="mm-btn mm-btn-scan" id="mm-scan-timeline" title="Run Spidey-Sense Variance Scan">Scan Timeline 🕷️</button>
      </div>
    </div>
    <div class="mm-mascot-wrapper" id="mm-toggle-avatar" title="Click Miss Minutes!">
      <div class="mm-pulse-ring"></div>
      <img src="./assets/miss-minutes.svg" alt="Miss Minutes TVA Mascot" class="mm-avatar-img" />
      <span class="mm-badge-dot" title="Active"></span>
    </div>
  `;

  const bubble = document.getElementById("mm-bubble");
  const quoteText = document.getElementById("mm-quote-text");
  const nextBtn = document.getElementById("mm-next-quote");
  const scanBtn = document.getElementById("mm-scan-timeline");
  const avatarToggle = document.getElementById("mm-toggle-avatar");
  const liveClock = document.getElementById("mm-live-clock");

  // Real-time retro clock updater
  function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    const secs = String(now.getSeconds()).padStart(2, '0');
    if (liveClock) {
      liveClock.textContent = `${hours}:${mins}:${secs} TVA`;
    }
  }
  setInterval(updateClock, 1000);
  updateClock();

  // Quote rotator
  function showNextQuote() {
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    quoteText.style.opacity = '0';
    quoteText.style.transform = 'translateY(4px)';
    setTimeout(() => {
      quoteText.textContent = quotes[currentQuoteIndex];
      quoteText.style.opacity = '1';
      quoteText.style.transform = 'translateY(0)';
    }, 200);
  }

  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    showNextQuote();
  });

  // Toggle bubble display when clicking avatar
  avatarToggle.addEventListener("click", () => {
    isMinimized = !isMinimized;
    if (isMinimized) {
      bubble.classList.add("mm-hidden");
    } else {
      bubble.classList.remove("mm-hidden");
      showNextQuote();
    }
  });

  // Easter Egg: Scan Timeline / Spidey-Sense pulse
  scanBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    quoteText.innerHTML = `<strong>SCANNING MULTIVERSE...</strong><br>🕷️ Spidey-Sense: 0 Anomalies.<br>⏳ Status: Canon Developer Verified!`;
    
    // Trigger momentary holographic scanline overlay across screen
    const scanner = document.createElement("div");
    scanner.className = "chrono-scanner-overlay";
    document.body.appendChild(scanner);
    
    setTimeout(() => {
      scanner.remove();
    }, 1400);
  });
})();

