/**
 * terminal.js  –  Sahil More's portfolio terminal
 * Real data from github.com/Sahilmore469
 */
(function initTerminal() {
  const output  = document.getElementById('term-output');
  const input   = document.getElementById('term-input');
  const history = [];
  let histIdx   = -1;

  const c       = (t, cls) => `<span class="${cls}">${t}</span>`;
  const cyan    = t => c(t, 't-cyan');
  const key     = t => c(t, 't-key');
  const str     = t => c(t, 't-str');
  const comment = t => c(t, 't-comment');
  const val     = t => c(t, 't-val');
  const err     = t => `<span style="color:#ff6b6b">${t}</span>`;
  const ok      = t => `<span style="color:#4ade80">${t}</span>`;

  const COMMANDS = {
    help: () => `
${cyan('Available commands:')}
  ${key('about')}       — who am I?
  ${key('skills')}      — my full tech arsenal
  ${key('projects')}    — what I've shipped
  ${key('education')}   — academic background
  ${key('experience')}  — what I'm building now
  ${key('contact')}     — get in touch
  ${key('github')}      — GitHub stats
  ${key('whoami')}      — quick identity
  ${key('date')}        — current date & time
  ${key('clear')}       — clear terminal
  ${key('joke')}        — random dev joke 😄
  ${key('matrix')}      — go deeper 🐇
  ${key('help')}        — show this list`,

    about: () => `
${cyan('$ whoami')}
{
  name:     ${str('"Sahil More"')},
  handle:   ${str('"@Sahilmore469"')},
  role:     ${str('"CS Engineering Student"')},
  location: ${str('"India 🇮🇳"')},
  status:   ${ok('"Building cool things ⚡"')},
  mindset:  ${str('"Ship it. Learn from it."')},
  focus:    [
              ${str('"Full-Stack Web"')},
              ${str('"Android (Flutter + Java)"')},
              ${str('"Data Analysis & ML"')},
              ${str('"DSA & System Programming"')}
            ],
  bio:      ${str('"I write code. Sometimes it even works. 🧠"')}
}`,

    skills: () => `
${cyan('// Tech Arsenal')}

${key('Languages')}  → C, C++, Java, Python, JavaScript, TypeScript, R
${key('Frontend')}   → React, Next.js, Angular.js, Bootstrap, HTML5, CSS3
${key('Backend')}    → Node.js, Express.js, Django, Flask, Socket.io
${key('Mobile')}     → Flutter, Java (Android)
${key('Databases')}  → MongoDB, MySQL, Neo4j, Firebase
${key('AI / ML')}    → TensorFlow, scikit-learn, OpenCV, MediaPipe, pandas, NumPy
${key('DevOps')}     → Git, GitHub, Vercel, Netlify, Linux
${key('Design')}     → Figma, Canva, Power BI
${key('Other')}      → WebRTC, REST API, TypeScript, DSA

${ok('▓▓▓▓▓▓▓▓▓▓')} JavaScript  ${str('95%')}
${ok('▓▓▓▓▓▓▓▓▓░')} Python      ${str('90%')}
${ok('▓▓▓▓▓▓▓▓░░')} C / C++     ${str('85%')}
${ok('▓▓▓▓▓▓▓░░░')} React       ${str('80%')}
${ok('▓▓▓▓▓▓░░░░')} Node.js     ${str('75%')}
${ok('▓▓▓▓▓░░░░░')} Flutter     ${str('65%')}`,

    projects: () => `
${cyan('// GitHub Projects  →  github.com/Sahilmore469')}

${key('01')} ${cyan('🖐️  Hand Gesture Laptop Control')}  ⭐ 1
    ${comment('// Control mouse + volume with hand gestures — no hardware needed')}
    Stack: ${str('Python · OpenCV · MediaPipe · PyAutoGUI · NumPy')}
    Link:  ${val('github.com/Sahilmore469/Hand-Gesture-Laptop-Control')}

${key('02')} ${cyan('💬  Real-Time Chat App')}  ⭐ 1
    ${comment('// Multi-user chat room with instant Socket.io updates')}
    Stack: ${str('Node.js · Socket.io · Express.js · HTML/CSS')}
    Link:  ${val('github.com/Sahilmore469/realtimechatapplication-nodejs-')}

${key('03')} ${cyan('🚌  E-Bus Ticket Booking')}
    ${comment('// Responsive booking platform for eco-friendly electric buses')}
    Stack: ${str('HTML · CSS · JavaScript')}
    Link:  ${val('github.com/Sahilmore469/ebusticketbooking')}

${key('04')} ${cyan('🧩  Puzzle Game')}
    ${comment('// Type-safe in-browser puzzle with smooth state management')}
    Stack: ${str('TypeScript · HTML · CSS')}
    Link:  ${val('github.com/Sahilmore469/puzzle-game')}

${key('05')} ${cyan('📹  WebRTC Video App')}
    ${comment('// P2P video/audio in the browser — pure JS, no plugins')}
    Stack: ${str('JavaScript · WebRTC · Node.js')}
    Link:  ${val('github.com/Sahilmore469/webrtc-app')}

${key('06')} ${cyan('🏢  NexaTech Company Site')}
    ${comment('// Polished responsive tech company landing page')}
    Stack: ${str('HTML · CSS · JavaScript')}
    Link:  ${val('github.com/Sahilmore469/nexatechcompany')}`,

    education: () => `
${cyan('// Education')}

${ok('●')} ${key('B.Tech – Computer Engineering')}
    Your College · 2022 – Present
    ${comment('Focus: Full-stack · DSA · System Programming · AI/ML')}

${ok('●')} ${key('Intermediate (10+2) – Science')}
    Your School · 2020 – 2022
    ${comment('Physics · Chemistry · Mathematics · Computer Science')}

${ok('●')} ${key('Matriculation (10th)')}
    Your School · 2019 – 2020
    ${comment('Strong foundation in Mathematics & Science')}`,

    experience: () => `
${cyan('// Currently working on…')}

${ok('→')} ${key('Full-Stack Web')}       React · Node.js · MongoDB · Socket.io
${ok('→')} ${key('Android Apps')}         Flutter · Java · Firebase
${ok('→')} ${key('Data / Power BI')}      pandas · NumPy · Matplotlib · R
${ok('→')} ${key('AI / CV Projects')}     OpenCV · MediaPipe · TensorFlow · scikit-learn
${ok('→')} ${key('DSA & Systems')}        C++ · Linux · deepening low-level thinking

${comment('// Mindset: "Ship it. Learn from it." ⚡')}`,

    github: () => `
${cyan('// GitHub – github.com/Sahilmore469')}

  Repositories : ${ok('15 public repos')}
  Starred by   : ${ok('community (2 projects)')}
  Top langs    : ${str('Python · JavaScript · HTML · TypeScript')}
  Trophies     : ${ok('NPTEL Elite Silver · Python Silver Badge (HackerRank)')}

${comment('// Snake contributions graph on profile README 🐍')}
${ok('→ github.com/Sahilmore469')}`,

    contact: () => `
${cyan('// Contact Sahil')}

  LinkedIn : ${val('linkedin.com/in/sahilmore45')}
  GitHub   : ${val('github.com/Sahilmore469')}
  Location : ${val('India 🇮🇳  ·  Open to Remote')}

${ok('→ Scroll to Contact section to send a message!')}`,

    whoami: () => ok('sahil-more — CS Engineering Student | Full-Stack Dev | India 🇮🇳 | Building cool things ⚡'),

    date: () => {
      const n = new Date();
      return `${cyan(n.toDateString())} ${key(n.toLocaleTimeString())} ${comment('// current time')}`;
    },

    joke: () => {
      const jokes = [
        `Why do programmers prefer dark mode? ${str('Because light attracts bugs! 🐛')}`,
        `A SQL query walks into a bar, sees two tables... ${str('"Can I join you?" 🍺')}`,
        `How many programmers does it take to change a light bulb? ${str('None — that\'s a hardware problem! 💡')}`,
        `Why do Java developers wear glasses? ${str('Because they don\'t C#! 👓')}`,
        `Sahil: "I fixed the bug!" ${str('Also Sahil: creates 3 more. Classic. 😅')}`,
        `"Ship it. Learn from it." ${str('— Sahil More, every commit message basically')}`,
      ];
      return jokes[Math.floor(Math.random() * jokes.length)];
    },

    matrix: () => `
${cyan('Wake up, Sahil...')}
${key('The Matrix has you.')}
${comment('Follow the white rabbit. 🐇')}
${str('There is no spoon — only unread Stack Overflow tabs.')}
${ok('You are the one who builds things.')} 🖥️`,

    clear: () => null,
  };

  function print(html, isCmd = false) {
    const line = document.createElement('div');
    line.style.cssText = 'font-family:Space Mono,monospace;font-size:.78rem;line-height:1.9;white-space:pre-wrap;word-break:break-word;padding:0 1.5rem';
    if (isCmd) {
      line.innerHTML = `<span style="color:var(--cyan)">$</span> <span style="color:#e8f8ff">${html}</span>`;
    } else {
      line.innerHTML = html;
    }
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  }

  function runCmd(raw) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    history.unshift(raw);
    histIdx = -1;
    print(raw, true);
    if (cmd === 'clear') { output.innerHTML = ''; return; }
    const fn = COMMANDS[cmd];
    if (fn) {
      const result = fn();
      if (result) print(result);
    } else {
      print(err(`command not found: ${raw}`) + `  ${comment('// try "help"')}`);
    }
  }

  setTimeout(() => {
    print(cyan("Welcome to Sahil More's Portfolio Terminal v2.0.0"));
    print(comment('// github.com/Sahilmore469  ·  Type "help" to explore'));
    print('');
  }, 300);

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') { runCmd(input.value); input.value = ''; }
    else if (e.key === 'ArrowUp')   { e.preventDefault(); if (histIdx < history.length-1) { histIdx++; input.value = history[histIdx]; } }
    else if (e.key === 'ArrowDown') { e.preventDefault(); if (histIdx > 0) { histIdx--; input.value = history[histIdx]; } else { histIdx = -1; input.value = ''; } }
    else if (e.key === 'Tab')       { e.preventDefault(); const m = Object.keys(COMMANDS).find(k => k.startsWith(input.value.trim().toLowerCase())); if (m) input.value = m; }
  });

  document.getElementById('terminal').addEventListener('click', () => input.focus());
  document.getElementById('btn-close').addEventListener('click', e => { e.stopPropagation(); output.innerHTML = ''; input.value = ''; print(err('Cleared. Type "help" to restart.')); });
  document.getElementById('btn-max').addEventListener('click', e => { e.stopPropagation(); runCmd('clear'); });
  document.getElementById('btn-min').addEventListener('click', e => { e.stopPropagation(); print(comment('// minimized — click to continue')); });
})();
