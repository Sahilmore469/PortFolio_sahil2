/**
 * orbiting-skills.js
 * Fully animated orbiting skills visualisation — vanilla JS / DOM.
 * Inspired by 21st.dev orbital component patterns.
 */

(function initOrbitingSkills() {

  /* ── SVG icon markup per technology ── */
  const ICONS = {
    html: {
      color: '#E34F26',
      label: 'HTML5',
      svg: `<svg viewBox="0 0 24 24" fill="currentColor" style="width:100%;height:100%">
              <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718
              10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33
              4.171L12 19.351l5.379-1.443.744-8.157H8.531z" fill="#E34F26"/>
            </svg>`,
    },
    css: {
      color: '#1572B6',
      label: 'CSS3',
      svg: `<svg viewBox="0 0 24 24" fill="currentColor" style="width:100%;height:100%">
              <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41
              4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29
              3.751L12 19.351l5.379-1.443.744-8.157z" fill="#1572B6"/>
            </svg>`,
    },
    javascript: {
      color: '#F7DF1E',
      label: 'JavaScript',
      svg: `<svg viewBox="0 0 24 24" style="width:100%;height:100%">
              <rect width="24" height="24" fill="#F7DF1E" rx="2"/>
              <path d="M22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14
              -.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9
              1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089
              c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616
              2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81
              1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248
              c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48
              -.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324
              1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346
              .012-2.054 0-4.109 0-6.179l.004-.056z" fill="#323330"/>
            </svg>`,
    },
    react: {
      color: '#61DAFB',
      label: 'React',
      svg: `<svg viewBox="0 0 24 24" fill="none" style="width:100%;height:100%">
              <circle cx="12" cy="12" r="2.05" fill="#61DAFB"/>
              <ellipse cx="12" cy="12" rx="11" ry="4.2" stroke="#61DAFB" stroke-width="1"/>
              <ellipse cx="12" cy="12" rx="11" ry="4.2" stroke="#61DAFB" stroke-width="1" transform="rotate(60 12 12)"/>
              <ellipse cx="12" cy="12" rx="11" ry="4.2" stroke="#61DAFB" stroke-width="1" transform="rotate(120 12 12)"/>
            </svg>`,
    },
    node: {
      color: '#339933',
      label: 'Node.js',
      svg: `<svg viewBox="0 0 24 24" fill="currentColor" style="width:100%;height:100%">
              <path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383
              .585-.203.703-.25 1.328-.602.065-.037.151-.023.218.017l2.256 1.339c.082.045.198.045.275
              0l8.795-5.076c.082-.047.135-.141.135-.241V6.921c0-.103-.055-.198-.137-.246l-8.791-5.072
              c-.081-.047-.189-.047-.273 0L2.075 6.675c-.084.048-.139.144-.139.246v10.146
              c0 .1.055.194.139.241l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787
              c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021
              c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L1.352 18.675
              C.533 18.215 0 17.352 0 16.43V6.284c0-.922.533-1.786 1.352-2.245L10.147.039
              c.8-.452 1.866-.452 2.657 0l8.796 5.002c.819.459 1.352 1.323 1.352 2.245
              v10.146c0 .922-.533 1.783-1.352 2.245l-8.796 5.078c-.28.163-.601.247-.926.247z
              m2.717-6.993c-3.849 0-4.654-1.766-4.654-3.246 0-.14.114-.253.256-.253h1.136
              c.127 0 .232.091.252.215.173 1.164.686 1.752 3.01 1.752 1.852 0 2.639-.419
              2.639-1.401 0-.566-.224-1.03-3.099-1.249-2.404-.184-3.89-.768-3.89-2.689
              0-1.771 1.491-2.825 3.991-2.825 2.808 0 4.199.975 4.377 3.068
              .007.072-.019.141-.065.193-.047.049-.111.077-.178.077h-1.14
              c-.119 0-.225-.083-.248-.196-.276-1.224-.944-1.616-2.746-1.616
              -2.023 0-2.259.705-2.259 1.234 0 .641.278.827 3.006 1.19
              2.7.359 3.982.866 3.982 2.771 0 1.922-1.603 3.024-4.399 3.024z" fill="#339933"/>
            </svg>`,
    },
    tailwind: {
      color: '#06B6D4',
      label: 'Tailwind CSS',
      svg: `<svg viewBox="0 0 24 24" fill="currentColor" style="width:100%;height:100%">
              <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8
              .913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12
              c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624
              C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6
              2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512
              2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89
              -2.288-1.624C10.337 13.382 8.976 12 6.001 12z" fill="#06B6D4"/>
            </svg>`,
    },
    mongodb: {
      color: '#47A248',
      label: 'MongoDB',
      svg: `<svg viewBox="0 0 24 24" fill="currentColor" style="width:100%;height:100%">
              <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44
              -.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912
              4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51
              -3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464
              c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29
              c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z" fill="#47A248"/>
            </svg>`,
    },
    nextjs: {
      color: '#ffffff',
      label: 'Next.js',
      svg: `<svg viewBox="0 0 24 24" fill="currentColor" style="width:100%;height:100%">
              <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 01-.364.033C7.443.346
              4.25 2.185 2.228 5.012a11.875 11.875 0 00-2.119 5.243c-.096.659-.108.854-.108
              1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422
              2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106
              .247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558
              a338.739 338.739 0 00-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01
              3.515-.052 3.595a.426.426 0 01-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068
              a.438.438 0 01-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0
              01.174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337
              1.999 2.895 4.361a10760.433 10760.433 0 004.735 7.17l1.9 2.879.096-.063a12.317
              12.317 0 002.466-2.163 11.944 11.944 0 002.824-6.134c.096-.66.108-.854.108-1.748
              0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597
              0 00-2.499-.523A33.119 33.119 0 0011.573 0zm4.069 7.217c.347 0 .408.005.486.047
              a.473.473 0 01.237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746
              -1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 01.233-.296c.096-.05.13-.054
              .5-.054z" fill="white"/>
            </svg>`,
    },
    git: {
      color: '#F05032',
      label: 'Git',
      svg: `<svg viewBox="0 0 24 24" fill="currentColor" style="width:100%;height:100%">
              <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627
              l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658
              2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719
              -1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525
              c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609
              0-.719-.719-.719-1.879 0-2.6.18-.18.387-.316.605-.406V8.835
              c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636
              3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604
              2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187" fill="#F05032"/>
            </svg>`,
    },
    figma: {
      color: '#F24E1E',
      label: 'Figma',
      svg: `<svg viewBox="0 0 24 24" fill="currentColor" style="width:100%;height:100%">
              <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014
              4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019
              s-1.354-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476
              0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51
              c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019h3.117V1.471H8.148zm4.587
              15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98z
              m-4.587-7.509c-1.665 0-3.019 1.354-3.019 3.019 0 1.664 1.354 3.019 3.019
              3.019h3.117v-6.038H8.148zm4.587 0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014
              4.49-4.49 4.49c-2.476 0-4.49-2.014-4.49-4.49v-4.49h-.098z
              m4.588 7.509c1.665 0 3.019-1.354 3.019-3.019
              0-1.665-1.354-3.019-3.019-3.019h-3.117v3.019c0 1.665 1.354 3.019 3.117
              3.019zM8.148 24c-2.476 0-4.49-2.014-4.49-4.49
              s2.014-4.49 4.49-4.49h4.588V24H8.148zm0-7.509c-1.665
              0-3.019 1.354-3.019 3.019C5.129 21.179 6.483 22.529 8.148
              22.529h3.117v-6.038H8.148z" fill="#F24E1E"/>
            </svg>`,
    },
    python: {
      color: '#3776AB',
      label: 'Python',
      svg: `<svg viewBox="0 0 24 24" fill="currentColor" style="width:100%;height:100%">
              <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2
              -.01.13V8.5l-.05.13-.08.11-.09.08-.1.06-.11.04-.12.02-.13.002
              -.14-.01-6.08-.02H6.66l-.21.03-.18.07-.17.12-.15.16-.12.2-.1.24-.07.3
              -.04.34-.01.38v3.26l.06.43.14.4.22.34.3.27.38.2.45.13.52.06.58
              -.01h.5l.06-.01.55.06.47.15.38.26.3.38.2.5.1.62v4.05l-.01.12
              -.04.12-.05.1-.08.08-.09.06-.1.04-.11.02H6.38l-.2-.03-.21-.06-.22-.1
              -.22-.14-.22-.19-.22-.24-.21-.3-.2-.36-.18-.42-.14-.49-.09-.56
              -.04-.63.01-.7.06-.77.12-.84.19-.9.27-.97.35-1.03.44-1.08.53-1.13
              .63-1.15.72L.67 8.08l.84-1.12.97-1.1 1.07-1.06 1.18-1.01
              1.27-.94 1.36-.86 1.43-.77 1.48-.67 1.52-.56 1.54-.45 1.54-.34
              1.51-.23 1.47-.12 1.41-.01 1.33.1L14.25.18zM9.75.16L8.29.24
              6.88.4 5.52.65 4.22.98 2.97 1.4 1.79 1.9.67 2.49-.38 3.16
              -1.37 3.91l-.95.83-.87.88-.77.93-.67.98-.56 1.02-.45 1.06
              -.34 1.1-.23 1.13-.12 1.16L-5 15.3l.02.59.07.55.12.52.17.49
              .22.45.28.42.33.38.39.34.44.3.5.26.55.22.6.18.65.14.7.1.74.06.78.02H10l.35-.03.32-.06.3-.1.27-.13.24-.17.21-.2.18-.24.15-.27.12-.31.1-.34.07-.38.05-.42.02-.46v-3.87l-.03-.37-.07-.35-.1-.33
              -.14-.3-.17-.27-.2-.24-.24-.2-.26-.17-.29-.14-.31-.1-.33-.07-.35-.04
              -.37-.01H6.12v-2.8h.6l.12.001h4.43l.32-.03.28-.08.24-.13.2-.17.16-.22
              .12-.27.08-.32.05-.37.01-.42v-3.46l-.02-.5-.07-.47-.11-.43-.16-.4
              -.2-.36-.24-.32-.27-.28-.3-.24-.33-.2-.36-.16-.38-.12-.4-.08-.41-.04
              -.42-.01L9.75.16z" fill="#3776AB"/>
            </svg>`,
    },
    docker: {
      color: '#2496ED',
      label: 'Docker',
      svg: `<svg viewBox="0 0 24 24" fill="currentColor" style="width:100%;height:100%">
              <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186
              0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118
              a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118
              a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.186m0 2.716h2.118
              a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118
              a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12
              a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1
              a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119
              a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136
              a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118
              a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118
              a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12
              a.186.186 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12
              a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119
              a.186.186 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12
              a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12
              a.186.186 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12
              a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185M23.763 9.89
              c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716
              -2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403
              2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0
              00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137
              1.005.001 2.007-.093 2.992-.282a12.921 12.921 0 003.494-1.207 8.169 8.169
              0 002.306-1.952c1.107-1.251 1.764-2.643 2.254-3.976h.196c1.21 0 1.954-.487
              2.373-.9.245-.23.433-.513.55-.827l.077-.282-.095-.069z" fill="#2496ED"/>
            </svg>`,
    },
  };

  /* ── Orbit configuration ── */
  const ORBITS = [
    {
      radius: 120,
      glowColor: '#00f5ff',
      glowColorRgb: '0,245,255',
      skills: [
        { id: 'html',       phase: 0 },
        { id: 'css',        phase: (2 * Math.PI) / 3 },
        { id: 'javascript', phase: (4 * Math.PI) / 3 },
      ],
      speed: 0.45,
      iconSize: 42,
    },
    {
      radius: 210,
      glowColor: '#a855f7',
      glowColorRgb: '168,85,247',
      skills: [
        { id: 'react',    phase: 0 },
        { id: 'node',     phase: (2 * Math.PI) / 3 },
        { id: 'tailwind', phase: (4 * Math.PI) / 3 },
      ],
      speed: -0.28,
      iconSize: 50,
    },
  ];

  /* ── Extra skills row (chips below the orbit) ── */
  const EXTRA_SKILLS = [
    { label: 'Next.js',    color: '#ffffff' },
    { label: 'MongoDB',    color: '#47A248' },
    { label: 'Express.js', color: '#ffffff' },
    { label: 'Three.js',   color: '#049EF4' },
    { label: 'Python',     color: '#3776AB' },
    { label: 'Git',        color: '#F05032' },
    { label: 'Figma',      color: '#F24E1E' },
    { label: 'REST API',   color: '#00f5ff' },
    { label: 'Redux',      color: '#764ABC' },
    { label: 'Docker',     color: '#2496ED' },
    { label: 'MySQL',      color: '#4479A1' },
    { label: 'C / C++',   color: '#A8B9CC' },
  ];

  /* ── Find & rebuild skills section ── */
  const section = document.getElementById('skills');
  if (!section) return;

  /* Clear existing content after the heading */
  const oldOrbit = section.querySelector('.skills-orbit');
  if (oldOrbit) oldOrbit.remove();

  /* ── Build wrapper ── */
  const wrapper = document.createElement('div');
  wrapper.className = 'orbit-section';
  wrapper.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:0;margin-top:1.5rem;';

  /* Center col: orbit visualisation */
  const orbitCol = document.createElement('div');
  orbitCol.className = 'orbit-col';
  orbitCol.style.cssText = 'display:flex;justify-content:center;align-items:center;';

  /* Canvas size responds to viewport */
  const SIZE = 440;
  const CX   = SIZE / 2;
  const CY   = SIZE / 2;

  const stage = document.createElement('div');
  stage.className = 'orbit-stage';
  stage.style.cssText = `width:${SIZE}px;height:${SIZE}px;position:relative;flex-shrink:0;overflow:visible;`;

  /* Orbit rings */
  ORBITS.forEach(o => {
    const ring = document.createElement('div');
    ring.className = 'orbit-ring';
    const d = o.radius * 2;
    ring.style.cssText = `
      position:absolute;
      top:50%;left:50%;
      width:${d}px;height:${d}px;
      margin-top:-${o.radius}px;margin-left:-${o.radius}px;
      border-radius:50%;
      border:1px solid rgba(${o.glowColorRgb},0.35);
      box-shadow:0 0 18px rgba(${o.glowColorRgb},0.18),inset 0 0 18px rgba(${o.glowColorRgb},0.07);
      pointer-events:none;
    `;
    /* Pulse overlay */
    const pulse = document.createElement('div');
    pulse.style.cssText = `
      position:absolute;inset:0;border-radius:50%;
      background:radial-gradient(circle,transparent 40%,rgba(${o.glowColorRgb},0.08) 80%,rgba(${o.glowColorRgb},0.18) 100%);
      animation:orbitPulse 4s ease-in-out infinite;
    `;
    ring.appendChild(pulse);
    stage.appendChild(ring);
  });

  /* Central icon */
  const centre = document.createElement('div');
  centre.className = 'orbit-centre';
  centre.innerHTML = `
    <div class="orbit-centre-glow orbit-centre-glow--cyan"></div>
    <div class="orbit-centre-glow orbit-centre-glow--purple"></div>
    <div class="orbit-centre-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"
           fill="none" stroke="url(#orbitGrad)" stroke-width="2"
           stroke-linecap="round" stroke-linejoin="round">
        <defs>
          <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stop-color="#00f5ff"/>
            <stop offset="100%" stop-color="#a855f7"/>
          </linearGradient>
        </defs>
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    </div>
  `;
  stage.appendChild(centre);

  /* Skill nodes */
  const nodes = [];

  ORBITS.forEach(orbit => {
    orbit.skills.forEach(sk => {
      const icon = ICONS[sk.id];
      if (!icon) return;

      const node = document.createElement('div');
      node.className = 'orbit-node';
      node.style.cssText = `
        position:absolute;
        top:50%;left:50%;
        width:${orbit.iconSize}px;height:${orbit.iconSize}px;
        margin-top:-${orbit.iconSize / 2}px;margin-left:-${orbit.iconSize / 2}px;
        cursor:pointer;
        z-index:10;
      `;

      const inner = document.createElement('div');
      inner.className = 'orbit-node__inner';
      inner.style.cssText = `
        width:100%;height:100%;padding:8px;
        background:rgba(4,18,38,0.92);
        backdrop-filter:blur(6px);
        border:1px solid rgba(${orbit.glowColorRgb},0.3);
        border-radius:50%;
        display:flex;align-items:center;justify-content:center;
        transition:transform 0.3s ease,box-shadow 0.3s ease,border-color 0.3s ease;
      `;
      inner.innerHTML = icon.svg;

      const tooltip = document.createElement('div');
      tooltip.className = 'orbit-tooltip';
      tooltip.textContent = icon.label;
      tooltip.style.cssText = `
        position:absolute;
        bottom:-28px;left:50%;
        transform:translateX(-50%);
        padding:3px 8px;
        background:rgba(2,11,24,0.95);
        border:1px solid rgba(${orbit.glowColorRgb},0.4);
        border-radius:4px;
        font-family:'Space Mono',monospace;
        font-size:.62rem;color:var(--text);
        white-space:nowrap;
        opacity:0;transition:opacity 0.2s;
        pointer-events:none;
        z-index:30;
      `;

      inner.addEventListener('mouseenter', () => {
        inner.style.transform     = 'scale(1.3)';
        inner.style.boxShadow     = `0 0 28px ${icon.color}60, 0 0 60px ${icon.color}20`;
        inner.style.borderColor   = icon.color;
        tooltip.style.opacity     = '1';
      });
      inner.addEventListener('mouseleave', () => {
        inner.style.transform   = '';
        inner.style.boxShadow   = '';
        inner.style.borderColor = `rgba(${orbit.glowColorRgb},0.3)`;
        tooltip.style.opacity   = '0';
      });

      node.appendChild(inner);
      node.appendChild(tooltip);
      stage.appendChild(node);

      nodes.push({ el: node, orbit: orbit.radius, phase: sk.phase, speed: orbit.speed });
    });
  });

  /* ── Pause on hover ── */
  let isPaused = false;
  stage.addEventListener('mouseenter', () => { isPaused = true; });
  stage.addEventListener('mouseleave', () => { isPaused = false; });

  orbitCol.appendChild(stage);

  /* Bottom: icon grid */
  const catCol = document.createElement('div');
  catCol.className = 'orbit-cats';
  catCol.style.cssText = 'display:flex;flex-direction:column;gap:1.2rem;width:100%;max-width:900px;opacity:1;transform:none;margin-top:2rem;border-top:1px solid var(--border);padding-top:2.5rem;';

  const CDN = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';
  const ICON_GROUPS = [
    {
      label: 'Languages', color: '#F7DF1E',
      icons: [
        { src: `${CDN}/c/c-original.svg`,                       name: 'C' },
        { src: `${CDN}/cplusplus/cplusplus-original.svg`,        name: 'C++' },
        { src: `${CDN}/java/java-original.svg`,                  name: 'Java' },
        { src: `${CDN}/python/python-original.svg`,              name: 'Python' },
        { src: `${CDN}/javascript/javascript-original.svg`,      name: 'JavaScript' },
        { src: `${CDN}/r/r-original.svg`,                        name: 'R' },
      ]
    },
    {
      label: 'Frontend', color: '#00f5ff',
      icons: [
        { src: `${CDN}/react/react-original.svg`,                name: 'React' },
        { src: `${CDN}/nextjs/nextjs-original.svg`,              name: 'Next.js',   invert: true },
        { src: `${CDN}/angularjs/angularjs-original.svg`,        name: 'Angular.js' },
        { src: `${CDN}/bootstrap/bootstrap-original.svg`,        name: 'Bootstrap' },
        { src: `${CDN}/css3/css3-original.svg`,                  name: 'CSS3' },
        { src: `${CDN}/tailwindcss/tailwindcss-original.svg`,    name: 'Tailwind' },
      ]
    },
    {
      label: 'Backend & Mobile', color: '#a855f7',
      icons: [
        { src: `${CDN}/nodejs/nodejs-original.svg`,              name: 'Node.js' },
        { src: `${CDN}/express/express-original.svg`,            name: 'Express.js', invert: true },
        { src: `${CDN}/django/django-plain.svg`,                 name: 'Django',     invert: true },
        { src: `${CDN}/flask/flask-original.svg`,                name: 'Flask',      invert: true },
        { src: `${CDN}/flutter/flutter-original.svg`,            name: 'Flutter' },
        { src: `${CDN}/socketio/socketio-original.svg`,          name: 'Socket.io',  invert: true },
      ]
    },
    {
      label: 'Databases & Cloud', color: '#47A248',
      icons: [
        { src: `${CDN}/mysql/mysql-original.svg`,                name: 'MySQL' },
        { src: `${CDN}/mongodb/mongodb-original.svg`,            name: 'MongoDB' },
        { src: `${CDN}/neo4j/neo4j-original.svg`,                name: 'Neo4j' },
        { src: `${CDN}/firebase/firebase-plain.svg`,             name: 'Firebase' },
        { src: `${CDN}/vercel/vercel-original.svg`,              name: 'Vercel',     invert: true },
        { src: `${CDN}/netlify/netlify-original.svg`,            name: 'Netlify' },
      ]
    },
    {
      label: 'Data & AI / ML', color: '#FF6F00',
      icons: [
        { src: `${CDN}/pandas/pandas-original.svg`,              name: 'Pandas' },
        { src: `${CDN}/numpy/numpy-original.svg`,                name: 'NumPy' },
        { src: `${CDN}/scikitlearn/scikitlearn-original.svg`,    name: 'Sklearn' },
        { src: `${CDN}/tensorflow/tensorflow-original.svg`,      name: 'TensorFlow' },
        { src: `${CDN}/matplotlib/matplotlib-original.svg`,      name: 'Matplotlib' },
        { src: `${CDN}/opencv/opencv-original.svg`,              name: 'OpenCV' },
      ]
    },
    {
      label: 'Tools & Design', color: '#F05032',
      icons: [
        { src: `${CDN}/git/git-original.svg`,                    name: 'Git' },
        { src: `${CDN}/github/github-original.svg`,              name: 'GitHub',     invert: true },
        { src: `${CDN}/figma/figma-original.svg`,                name: 'Figma' },
        { src: `${CDN}/canva/canva-original.svg`,                name: 'Canva' },
        { src: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg', name: 'Power BI' },
        { src: `${CDN}/opencv/opencv-original.svg`,              name: 'MediaPipe', emoji: '🤖' },
      ]
    },
  ];

  ICON_GROUPS.forEach(group => {
    const groupEl = document.createElement('div');

    // Section header
    const header = document.createElement('div');
    header.style.cssText = `font-family:'Space Mono',monospace;font-size:.62rem;color:${group.color};letter-spacing:.18em;text-transform:uppercase;margin-bottom:.5rem;display:flex;align-items:center;gap:.6rem;`;
    header.innerHTML = `<span style="display:inline-block;width:24px;height:1px;background:${group.color};opacity:.7"></span>${group.label}<span style="display:inline-block;flex:1;height:1px;background:rgba(255,255,255,.08)"></span>`;

    // Icon row
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;flex-wrap:wrap;justify-content:center;gap:.6rem;';

    group.icons.forEach(icon => {
      const item = document.createElement('div');
      item.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:.3rem;padding:.5rem .3rem;border-radius:8px;border:1px solid transparent;transition:all .25s;cursor:default;';

      const img = document.createElement(icon.emoji ? 'div' : 'img');
      if (icon.emoji) {
        img.textContent = icon.emoji;
        img.style.cssText = 'width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-size:1.4rem;';
      } else {
        img.src = icon.src;
        img.alt = icon.name;
        img.style.cssText = `width:32px;height:32px;${icon.invert ? 'filter:invert(1);' : ''}`;
      }

      const label = document.createElement('span');
      label.textContent = icon.name;
      label.style.cssText = "font-family:'Space Mono',monospace;font-size:.5rem;color:var(--text2);text-align:center;white-space:nowrap;letter-spacing:.02em;";

      item.appendChild(img);
      item.appendChild(label);

      item.addEventListener('mouseenter', () => {
        item.style.borderColor = group.color + '55';
        item.style.background  = 'rgba(0,245,255,.05)';
        item.style.transform   = 'translateY(-3px)';
        item.style.boxShadow   = `0 8px 24px ${group.color}22`;
        label.style.color      = group.color;
      });
      item.addEventListener('mouseleave', () => {
        item.style.borderColor = 'transparent';
        item.style.background  = '';
        item.style.transform   = '';
        item.style.boxShadow   = '';
        label.style.color      = 'var(--text2)';
      });

      row.appendChild(item);
    });

    groupEl.appendChild(header);
    groupEl.appendChild(row);
    catCol.appendChild(groupEl);
  });

  wrapper.appendChild(orbitCol);
  wrapper.appendChild(catCol);
  section.appendChild(wrapper);

  /* ── Animation loop ── */
  let t = 0;
  let lastTs = performance.now();

  function tick(now) {
    if (!isPaused) {
      const dt = (now - lastTs) / 1000;
      t += dt;
    }
    lastTs = now;

    nodes.forEach(({ el, orbit, phase, speed }) => {
      const angle = t * speed + phase;
      const x = Math.cos(angle) * orbit;
      const y = Math.sin(angle) * orbit;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });

    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  /* ── Resize ── */
  window.addEventListener('resize', () => {
    const newSize = Math.min(460, window.innerWidth * 0.42);
    stage.style.width  = newSize + 'px';
    stage.style.height = newSize + 'px';
  });

})();