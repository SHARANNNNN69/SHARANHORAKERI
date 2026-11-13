/**
 * ====================================================================
 * SHARAN HORAKERI — PORTFOLIO CONFIGURATION
 * Real info. Simple English. No filler.
 * sharannnnn.online | github.com/SHARANNNNN69
 * ====================================================================
 */

const PORTFOLIO_CONFIG = {
  personal: {
    name: "Sharan Horakeri",
    nickname: "SHARANNNN",
    role: "CSE (AI) Student · Aspiring AI Engineer",
    location: "Hubballi, Karnataka, India",
    status: "Open to Internships & Research Collaborations",
    shortBio: "Hi, I'm Sharan. I study Computer Science and AI at KLE Technological University, Hubballi. I build AI surveillance systems, computer vision tools, local AI setups, and software that actually solves real problems. Still learning, still building — one commit at a time.",
    email: "srhorakeri@gmail.com",
    github: "https://github.com/SHARANNNNN69",
    linkedin: "https://in.linkedin.com/in/sharan-r-horakeri-013b83381",
    x: "https://x.com/sharanhorakeri",
    instagram: "https://www.instagram.com/sharanhorakeri",
    leetcode: "https://leetcode.com",
    website: "https://sharannnnn.online",
    resumeUrl: "./assets/resume.pdf"
  },

  // Running Marquee Ticker — no hearts, just facts
  ticker: [
    "SHARAN HORAKERI",
    "CSE (AI) · KLE TECHNOLOGICAL UNIVERSITY",
    "COMPUTER VISION · LOCAL AI · REAL PROBLEMS",
    "HUBBALLI, KARNATAKA · INDIA",
    "OPEN TO INTERNSHIPS",
    "GITHUB · SHARANNNNN69",
    "sharannnnn.online"
  ],

  // Education
  education: [
    {
      degree: "B.E. in Computer Science & Engineering (Artificial Intelligence)",
      institution: "KLE Technological University",
      period: "2024 — 2028 · Sem III · Division B",
      badge: "In Progress",
      summary: "Currently in Semester III. My subjects include Discrete Mathematical Structures, Database Management Systems, Design and Analysis of Algorithms, and Operating System Principles. I had a difficult second year because of my health, but I'm back and focused.",
      coursework: [
        "Discrete Mathematical Structures",
        "Database Management Systems",
        "Database Applications Lab",
        "Design & Analysis of Algorithms",
        "Algorithms Lab",
        "Operating System Principles & Programming"
      ]
    },
    {
      degree: "Pre-University (Science & Mathematics)",
      institution: "Senior Secondary School · Hubballi",
      period: "Completed 2024",
      badge: "Completed",
      summary: "Completed 12th with Physics, Chemistry, and Mathematics. Strong foundation in analytical thinking and mathematical reasoning.",
      coursework: [
        "Mathematics (Calculus & Vectors)",
        "Physics & Analytical Thinking",
        "Computer Science Fundamentals"
      ]
    }
  ],

  // Domains & Technical Skills
  domains: [
    {
      name: "AI & Computer Vision",
      icon: "🧠",
      description: "Building systems that understand what cameras see. Real-time object detection, pose tracking, and local AI setups that don't need cloud.",
      skills: ["Python", "OpenCV", "YOLOv8", "MediaPipe", "Ollama", "Moondream", "Qwen 2.5 Coder 7B", "Intel RealSense D435", "RTSP Streams"]
    },
    {
      name: "Computer Science Core",
      icon: "⚙️",
      description: "Algorithms, data structures, operating systems, and databases. The fundamentals that make everything else work.",
      skills: ["Data Structures & Algorithms", "C", "C++", "SQL / MySQL", "Database Systems", "OS Principles", "Git & GitHub", "Linux"]
    },
    {
      name: "Software & Web Development",
      icon: "💻",
      description: "Building full applications, billing software, mobile apps, and tools that people actually use.",
      skills: ["JavaScript", "Node.js", "Express", "React Native", "HTML5 & CSS", "REST APIs", "MySQL", "Windows Desktop Apps"]
    }
  ],

  // Real Projects
  works: [
    {
      id: "ai-cctv",
      title: "AI CCTV Monitoring System",
      domain: "Computer Vision / AI",
      period: "2026",
      badge: "Flagship Project",
      description: "An AI-powered surveillance system that makes cameras understand what is happening, not just record it. Uses RTSP streams with YOLO and local AI models to detect and describe events in real time.",
      points: [
        "Connects to any IP camera via RTSP and runs YOLOv8 object detection locally.",
        "Integrates Ollama and Moondream for natural language scene description.",
        "Zero cloud dependency — runs entirely on local hardware for privacy."
      ],
      tags: ["Python", "OpenCV", "YOLOv8", "Ollama", "Moondream", "RTSP", "CCTV"],
      github: "https://github.com/SHARANNNNN69",
      demo: null
    },
    {
      id: "vyapaar-one",
      title: "Vyapaar One — Wholesale Billing Software",
      domain: "Business Software",
      period: "2026",
      badge: "Commercial Project",
      description: "Billing software built for Indian wholesale and retail businesses. Supports GST invoicing, account and unaccount modes, and handles 30 to 150 bills per day easily. Works on both PC and Android.",
      points: [
        "GST billing with account/unaccount modes for different business types.",
        "Handles high daily bill volumes for wholesale operations.",
        "Designed for PC and Android — no technical knowledge required to use."
      ],
      tags: ["Node.js", "Express", "MySQL", "React Native", "GST", "Billing"],
      github: "https://github.com/SHARANNNNN69",
      demo: null
    },
    {
      id: "ruview",
      title: "RuView — ESP32 Wi-Fi Sensing Array",
      domain: "Embedded Systems / IoT",
      period: "2025",
      badge: "Hardware Project",
      description: "An ESP32-based RSSI sensing project that maps Wi-Fi signal strength to understand space and presence. Inspired by Wi-Fi sensing research for indoor positioning.",
      points: [
        "Uses multiple ESP32 nodes to collect RSSI data across a space.",
        "Processes signal patterns to detect presence and movement.",
        "Runs entirely offline with no cloud connection needed."
      ],
      tags: ["ESP32", "RSSI", "Wi-Fi Sensing", "Embedded C", "IoT"],
      github: "https://github.com/SHARANNNNN69",
      demo: null
    },
    {
      id: "knife-hit",
      title: "Knife Hit — React Native Mobile Game",
      domain: "Mobile Development",
      period: "2025",
      badge: "Mobile App",
      description: "A mobile game built with React Native. Players throw knives at a rotating log and try not to hit the knives already stuck in. Simple concept, addictive gameplay.",
      points: [
        "Built entirely in React Native for Android.",
        "Smooth physics and collision detection without game engine dependencies.",
        "Clean UI with score tracking and difficulty progression."
      ],
      tags: ["React Native", "JavaScript", "Mobile", "Android"],
      github: "https://github.com/SHARANNNNN69",
      demo: null
    }
  ],

  // FAQ
  faq: [
    {
      num: "01",
      q: "What are you looking for right now?",
      a: "I'm looking for internship opportunities in AI, computer vision, or software development. I'm also open to research collaborations on practical AI projects."
    },
    {
      num: "02",
      q: "What tech do you work with day to day?",
      a: "Python, OpenCV, YOLOv8, Ollama (for local AI), C++, MySQL, and JavaScript. I run models locally on my ASUS TUF F15 with an RTX 3050. I also work with the Intel RealSense D435 depth camera for computer vision projects."
    },
    {
      num: "03",
      q: "What kind of problems do you like solving?",
      a: "Real ones. I like building things people will actually use — AI surveillance systems, billing software for small businesses, local AI tools that don't need a cloud subscription. If it solves a real problem for real people, I'm interested."
    },
    {
      num: "04",
      q: "How do you like to learn?",
      a: "From basics up. I need to understand the why before the how. I work best with examples, step-by-step explanations, and building something small with a new concept right away. I don't just want an answer — I want to understand how to reach it."
    },
    {
      num: "05",
      q: "What is your website?",
      a: "sharannnnn.online — that's the one. And my GitHub is SHARANHORAKERI."
    }
  ]
};

if (typeof Object.freeze === "function") {
  Object.freeze(PORTFOLIO_CONFIG);
}
