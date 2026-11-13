# ⏳ The Multiverse Portfolio - 2nd Year CS & AI Engineer

A high-performance, modern, minimalist developer portfolio crafted with pure **Vanilla HTML5, Modern CSS3, and JavaScript** (zero dependencies, blazing fast).

Inspired by a fusion of **Marvel aesthetics** — Loki's TVA Sacred Timeline, Spider-Man's neural web dynamics, and Miss Minutes retro-futurism.

---

## 🌟 Highlights & Key Features

- **Zero Dependencies**: Pure HTML, CSS, and JS. No `node_modules`, no complex build steps, loads in milliseconds anywhere.
- **Multiverse Theme Switcher**:
  - ⏳ **TVA Sacred Timeline**: Sleek slate, Loki gold, emerald accents, and vintage orange.
  - 🕷️ **Spider-Verse Neon**: Electric Miles Morales crimson, vibrant cyan, and deep noir.
  - ✦ **Obsidian Noir**: Ultra-clean, modern minimalist high-contrast monochrome.
- **Interactive Neural Web & Timeline Canvas**:
  - Particle nodes dynamically form spider-webs and neural synapses that react to cursor movement and click waves.
- **Miss Minutes Retro Mascot**:
  - Live ticking TVA timeline clock.
  - Cycles witty developer & recruiter tips.
  - Easter egg: *Spidey-Sense & Timeline Variance Scanner* with holographic visual scan.
- **Dynamic Content Architecture (`js/config.js`)**:
  - Centralized, cleanly documented configuration file. Edit your name, bio, social links, skills, projects, and timeline in one place.
- **Project Showcase with Interactive Filtering**:
  - Filter by AI & ML, Computer Vision, Systems, or Web.
  - Live demo & GitHub repo links with deep-dive technical modal.
- **Sacred Timeline (Milestones & Education)**:
  - Vertical glowing timeline charting university coursework, hackathon wins, and dev milestones.
- **Dossier & Resume Section**:
  - One-click print/save-as-PDF or custom resume link.
- **Working Contact Dispatcher**:
  - Form validation with interactive feedback and default email client fallback.

---

## 📁 File Structure

```
PORTFOLIO/
├── index.html                   # Semantic HTML5 markup & accessible structure
├── README.md                    # Documentation & deployment guide
├── css/
│   ├── style.css                # Design system tokens, themes, layouts, typography
│   └── animations.css           # Keyframes, pulsing beacons, glows
├── js/
│   ├── config.js                # ★ CUSTOMIZE YOUR INFO, LINKS & PROJECTS HERE
│   ├── particles.js             # Interactive spider-web & neural canvas
│   ├── miss-minutes.js          # Retro TVA mascot, live clock & easter eggs
│   └── app.js                   # Filtering, navigation, modals & themes
└── assets/
    ├── favicon.svg              # Multiverse Loom vector icon
    ├── avatar.svg               # Cyberpunk / Spidey tech avatar
    ├── miss-minutes.svg         # Retro Miss Minutes vector art
    └── projects/
        ├── multiverse-rag.svg   # AI RAG pipeline illustration
        ├── spider-vision.svg    # Computer vision radar illustration
        ├── chrono-flow.svg      # Timeline scheduler illustration
        └── nexus-terminal.svg   # Retro CRT dev shell illustration
```

---

## ⚡ How to Run & Preview

Since this project uses pure vanilla web technologies, you can preview it immediately:

### Option 1: Directly in Any Browser
Double-click `index.html` or open it with Google Chrome, Microsoft Edge, Firefox, or Safari.

### Option 2: Using Node or Python Local Server
If you'd like a local HTTP server:

```powershell
# Using Python
python -m http.server 3000

# Or using npx serve
npx serve .
```
Then visit `http://localhost:3000` in your browser.

---

## 🛠️ How to Customize Your Details

Open `js/config.js` in your editor. You can update:

1. **Personal Information**:
   ```javascript
   personal: {
     name: "Your Name",
     title: "2nd Year CS & AI Engineer",
     location: "Your City / Country",
     bio: "Your custom bio..."
   }
   ```
2. **Social Links**:
   Update your GitHub, LinkedIn, X/Twitter, and LeetCode URLs in `socials`.
3. **Projects**:
   Add or update projects in the `projects` array with your own titles, GitHub repositories, and live demo links.
4. **Skills**:
   Adjust skill levels (0-100) or add new libraries (e.g., TensorFlow, Next.js, Docker).

---

## 🚀 How to Deploy (Free)

### 1. GitHub Pages
1. Push this folder to a GitHub repository (e.g. `portfolio`).
2. Go to **Settings** > **Pages** in your repository.
3. Under **Branch**, select `main` (root) and click **Save**.
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/`!

### 2. Vercel
1. Run `npx vercel` in this folder, or import the GitHub repo on [vercel.com](https://vercel.com).
2. It deploys automatically in under 5 seconds!

