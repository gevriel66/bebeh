const PASSCODE = "2010";
const PASSCODE_LENGTH = 4;

const lockScreen = document.getElementById("lock-screen");
const garden = document.getElementById("garden");
const unlockBloom = document.getElementById("unlock-bloom");
const clock = document.getElementById("lock-clock");
const date = document.getElementById("lock-date");
const dots = document.getElementById("passcode-dots");
const feedback = document.getElementById("passcode-feedback");
const music = document.getElementById("bg-music");
const musicToggle = document.getElementById("music-toggle");
const musicFeedback = document.getElementById("music-feedback");
const note = document.getElementById("love-note");

let enteredCode = "";
let isUnlocked = false;
let noteIndex = 0;

const notes = [
  "Semoga malam ini kamu tidur dengan mood yang baik. Kalau hari ini terasa panjang dan berat, ingat ya kalau kamu selalu punya tempat paling hangat di hati acuu.",
  "Kalau aku bisa memilih satu hal untuk dibawa ke mimpi malam ini, aku akan memilih senyummu. Semoga besok ada banyak alasan baru untuk tersenyum (tapi senyumnya buat aku aja yaa hehe).",
  "Terima kasih sudah hadir dan membuat hari-hariku terasa lebih indah, nyaman dan aman. Istirahat yang nyenyak ya, manusia mungil kesayanganku. Kamu pantas mendapat mimpi yang paling manis.",
  "Jauh atau dekat, ramai atau sunyi, ada satu hal yang selalu sama: aku bersyukur memilikimu lagi. Selamat tidur, semoga besok tidak badmood di Mattea Coffe hahaha.",
];

function updateClock() {
  const now = new Date();

  clock.textContent = new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(now);

  date.textContent = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(now);
}

function updateDots() {
  const passcodeDots = dots.querySelectorAll(".passcode-dot");

  passcodeDots.forEach((dot, index) => {
    dot.classList.toggle("is-filled", index < enteredCode.length);
  });

  dots.setAttribute(
    "aria-label",
    `${enteredCode.length} dari ${PASSCODE_LENGTH} digit dimasukkan`,
  );
}

async function startMusic() {
  try {
    await music.play();
    musicToggle.setAttribute("aria-pressed", "true");
    musicToggle.setAttribute("aria-label", "Matikan musik");
    musicFeedback.textContent = "";
  } catch (error) {
    musicToggle.setAttribute("aria-pressed", "false");
    musicToggle.setAttribute("aria-label", "Putar musik");
    musicFeedback.textContent = "Musik belum bisa diputar. Coba sentuh tombol musik.";
  }
}

function unlockGarden() {
  isUnlocked = true;
  garden.hidden = false;
  garden.setAttribute("aria-hidden", "false");
  unlockBloom.classList.add("is-active");
  lockScreen.classList.add("is-unlocking");
  window.requestAnimationFrame(() => {
    garden.classList.add("is-visible");
  });

  window.setTimeout(() => {
    lockScreen.hidden = true;
  }, 750);

  void startMusic();
}

function submitDigit(digit) {
  if (isUnlocked || enteredCode.length >= PASSCODE_LENGTH) {
    return;
  }

  enteredCode += digit;
  feedback.textContent = "";
  updateDots();

  if (enteredCode.length === PASSCODE_LENGTH) {
    if (enteredCode === PASSCODE) {
      unlockGarden();
      return;
    }

    feedback.textContent = "Belum pas, coba sekali lagi ya.";
    dots.classList.remove("is-shaking");
    void dots.offsetWidth;
    dots.classList.add("is-shaking");
    enteredCode = "";
    window.setTimeout(updateDots, 280);
  }
}

function deleteDigit() {
  if (isUnlocked || enteredCode.length === 0) {
    return;
  }

  enteredCode = enteredCode.slice(0, -1);
  feedback.textContent = "";
  updateDots();
}

document.querySelectorAll("[data-digit]").forEach((button) => {
  button.addEventListener("click", () => {
    submitDigit(button.dataset.digit);
  });
});

document.getElementById("delete-digit").addEventListener("click", deleteDigit);

document.addEventListener("keydown", (event) => {
  if (isUnlocked || event.altKey || event.ctrlKey || event.metaKey) {
    return;
  }

  if (/^\d$/.test(event.key)) {
    submitDigit(event.key);
  } else if (event.key === "Backspace" || event.key === "Delete") {
    deleteDigit();
  } else if (event.key === "Escape") {
    enteredCode = "";
    feedback.textContent = "";
    updateDots();
  }
});

musicToggle.addEventListener("click", async () => {
  if (music.paused) {
    await startMusic();
    return;
  }

  music.pause();
  musicToggle.setAttribute("aria-pressed", "false");
  musicToggle.setAttribute("aria-label", "Putar musik");
  musicFeedback.textContent = "";
});

document.getElementById("another-note").addEventListener("click", () => {
  noteIndex = (noteIndex + 1) % notes.length;
  note.textContent = notes[noteIndex];
});

updateClock();
window.setInterval(updateClock, 30_000);
