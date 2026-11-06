const garden = document.getElementById("garden");
const stars = document.getElementById("stars");
const waterButton = document.getElementById("waterButton");
const waterCount = document.getElementById("waterCount");
const gardenStatus = document.getElementById("gardenStatus");
const musicButton = document.getElementById("musicButton");
const musicPanel = document.getElementById("musicPanel");

const TOTAL_ROSES = 200;
const MAX_WATERINGS = 5;
let waterings = 0;
let growthBoost = 1;

// Fundo estrelado
for (let i = 0; i < 145; i++) {
  const star = document.createElement("i");
  star.className = "star";
  star.style.setProperty("--x", `${Math.random() * 100}%`);
  star.style.setProperty("--y", `${Math.random() * 100}%`);
  star.style.setProperty("--size", `${1 + Math.random() * 2.2}px`);
  star.style.setProperty("--duration", `${1.5 + Math.random() * 3.5}s`);
  star.style.setProperty("--delay", `${Math.random() * 4}s`);
  stars.appendChild(star);
}

// SVG de uma rosa estilizada com pétalas sobrepostas, sombras e nervuras.
function roseSVG(seed) {
  const hueShift = (seed % 7) - 3;
  const id = `r${seed}`;
  return `
  <svg viewBox="0 0 120 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rosa vermelha">
    <defs>
      <linearGradient id="${id}stem" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#123d25"/>
        <stop offset=".48" stop-color="#39864a"/>
        <stop offset="1" stop-color="#0c321e"/>
      </linearGradient>
      <radialGradient id="${id}petal" cx="36%" cy="25%" r="78%">
        <stop offset="0" stop-color="#ff8b9d"/>
        <stop offset=".28" stop-color="#e83d5d"/>
        <stop offset=".68" stop-color="#a80e32"/>
        <stop offset="1" stop-color="#51051d"/>
      </radialGradient>
      <radialGradient id="${id}inner" cx="38%" cy="25%" r="75%">
        <stop offset="0" stop-color="#ff9aa9"/>
        <stop offset=".35" stop-color="#e52d50"/>
        <stop offset="1" stop-color="#760b29"/>
      </radialGradient>
      <linearGradient id="${id}leaf" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#6fae59"/>
        <stop offset=".45" stop-color="#28683a"/>
        <stop offset="1" stop-color="#10351f"/>
      </linearGradient>
      <filter id="${id}shadow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2.2"/>
      </filter>
    </defs>

    <!-- Sombra suave no solo -->
    <ellipse cx="60" cy="222" rx="22" ry="4" fill="#050a08" opacity=".45" filter="url(#${id}shadow)"/>

    <!-- Caule curvo -->
    <path d="M60 216 C54 180 68 145 59 112 C56 98 61 87 61 80"
      fill="none" stroke="url(#${id}stem)" stroke-width="5.2" stroke-linecap="round"/>
    <path d="M59 213 C54 177 66 145 58 113"
      fill="none" stroke="#83b66a" stroke-width="1" opacity=".35"/>

    <!-- Espinhos -->
    <path d="M57 174 l-8 -5 8 1 M62 148 l8 -6 -7 2"
      fill="#477e3b" stroke="#477e3b" stroke-width="1.5" stroke-linejoin="round"/>

    <!-- Folhas laterais -->
    <g>
      <path d="M58 181 C39 166 22 170 18 184 C34 196 49 193 58 181Z"
        fill="url(#${id}leaf)" stroke="#17452a" stroke-width="1.2"/>
      <path d="M57 181 Q38 180 22 184" class="leaf-vein"/>
      <path d="M62 158 C78 140 99 143 103 157 C91 173 73 171 62 158Z"
        fill="url(#${id}leaf)" stroke="#17452a" stroke-width="1.2"/>
      <path d="M64 158 Q84 156 100 157" class="leaf-vein"/>
      <path d="M57 133 C42 119 26 122 23 135 C36 149 49 145 57 133Z"
        fill="url(#${id}leaf)" stroke="#17452a" stroke-width="1.1"/>
      <path d="M55 133 Q39 132 26 135" class="leaf-vein"/>
      <path d="M61 190 C75 177 89 181 91 192 C80 203 69 201 61 190Z"
        fill="url(#${id}leaf)" stroke="#17452a" stroke-width="1"/>
      <path d="M63 190 Q77 189 89 192" class="leaf-vein"/>
    </g>

    <!-- Cálice verde sob a flor -->
    <path d="M60 88 C47 91 43 83 38 79 C48 80 53 82 60 84
             C66 80 73 78 83 79 C77 87 70 91 60 88Z"
      fill="#28683b" stroke="#17452a" stroke-width="1.2"/>
    <path d="M59 87 Q47 73 49 67 Q57 75 60 84 Q66 72 73 69 Q72 80 62 88Z"
      fill="#3d8748" stroke="#1c542f" stroke-width="1"/>

    <!-- Pétalas externas: formas orgânicas sobrepostas -->
    <g transform="translate(0 0)">
      <path d="M60 84 C39 91 23 76 30 56 C35 43 49 41 60 52 C73 39 91 45 94 60 C99 79 78 91 60 84Z"
        fill="#680923" opacity=".75"/>
      <path d="M59 78 C39 91 19 76 27 57 C31 46 43 43 54 53
               C53 37 67 30 80 39 C95 49 91 70 76 82 C69 86 64 84 59 78Z"
        fill="url(#${id}petal)" stroke="#8e1233" stroke-width="1.4"/>
      <path d="M61 78 C72 89 94 81 96 64 C98 49 87 42 76 48
               C84 32 70 24 58 31 C44 39 47 58 61 78Z"
        fill="url(#${id}petal)" stroke="#a51b3d" stroke-width="1.3"/>
      <path d="M59 75 C42 77 35 63 43 50 C49 41 60 45 64 56
               C70 42 83 46 85 58 C88 72 72 82 59 75Z"
        fill="url(#${id}inner)" stroke="#b51b40" stroke-width="1.2"/>
      <path d="M59 70 C48 65 49 51 59 47 C70 43 78 54 73 65
               C69 74 62 76 59 70Z"
        fill="#9f1032" stroke="#e54a68" stroke-width="1"/>
      <path d="M59 66 C54 59 59 51 65 53 C72 55 70 64 64 68
               C61 70 58 68 59 66Z"
        fill="#5a071e"/>
      <path d="M37 57 C39 48 47 45 53 50" fill="none"
        stroke="#ff9eaa" stroke-width="2" opacity=".55" stroke-linecap="round"/>
      <path d="M76 48 C85 47 90 55 87 64" fill="none"
        stroke="#ff9eaa" stroke-width="1.8" opacity=".45" stroke-linecap="round"/>
      <path d="M49 73 C54 80 67 83 77 75" fill="none"
        stroke="#5e071f" stroke-width="2" opacity=".55"/>
    </g>
  </svg>`;
}

// Distribui 200 rosas em camadas, com variação de tamanho e profundidade.
for (let i = 0; i < TOTAL_ROSES; i++) {
  const rose = document.createElement("div");
  const backLayer = Math.random() < 0.38;
  rose.className = backLayer ? "rose rose-back" : "rose";

  const width = backLayer
    ? 24 + Math.random() * 22
    : 34 + Math.random() * 34;
  const height = width * (1.65 + Math.random() * 0.2);

  const left = Math.random() * 99;
  const base = Math.random() * 13;
  const delay = (i * 0.075) + Math.random() * 5;

  rose.style.setProperty("--left", `${left}%`);
  rose.style.setProperty("--base", `${base}%`);
  rose.style.setProperty("--width", `${width}px`);
  rose.style.setProperty("--height", `${height}px`);
  rose.style.setProperty("--grow-delay", `${delay}s`);
  rose.style.setProperty("--grow-duration", `${38 + Math.random() * 18}s`);
  rose.style.setProperty("--sway", `${3.5 + Math.random() * 3}s`);
  rose.style.setProperty("--sway-delay", `${Math.random() * 2}s`);
  rose.innerHTML = roseSVG(i);
  garden.appendChild(rose);
}

// Regar reduz a duração restante do crescimento e mostra gotas.
waterButton.addEventListener("click", () => {
  if (waterings >= MAX_WATERINGS) return;

  waterings++;
  growthBoost += 0.35;
  waterCount.textContent = `Regas: ${waterings} / ${MAX_WATERINGS}`;
  gardenStatus.textContent = "A água ajuda o jardim a florescer ✦";

  // Acelera as rosas que ainda estão crescendo.
  document.querySelectorAll(".rose").forEach((rose) => {
    rose.style.animationDuration =
      `${Math.max(5, 42 / growthBoost)}s, var(--sway)`;
    rose.style.animationDelay = "0s, var(--sway-delay)";
  });

  for (let i = 0; i < 42; i++) {
    const drop = document.createElement("span");
    drop.className = "water-drop";
    drop.style.left = `${Math.random() * 100}%`;
    drop.style.animationDelay = `${Math.random() * 0.7}s`;
    garden.appendChild(drop);
    drop.addEventListener("animationend", () => drop.remove(), { once: true });
  }

  if (waterings === MAX_WATERINGS) {
    gardenStatus.textContent = "Jardim totalmente regado 🌹";
    waterButton.innerHTML = "🌹 Jardim regado";
    waterButton.disabled = true;
  }
});

// Abre/fecha os controles do Spotify. A reprodução automática depende do navegador.
musicButton.addEventListener("click", () => {
  const open = musicPanel.classList.toggle("open");
  musicButton.textContent = open ? "Fechar música" : "♫ Música";
});


// VIRADA ENTRE O JARDIM E A CARTINHA
const book = document.getElementById("book");
const turnToLetter = document.getElementById("turnToLetter");
const turnToGarden = document.getElementById("turnToGarden");

turnToLetter.addEventListener("click", () => {
  book.classList.add("is-turned");
});

turnToGarden.addEventListener("click", () => {
  book.classList.remove("is-turned");
});
