// ====== PAGES ======
const pages = ["page1","page2","page3","page4"];
const showPage = (id) => {
  pages.forEach(p => document.getElementById(p).classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// ====== MUSIC ======
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
let musicStarted = false;
const START_AT_SECONDS = 38;

async function startMusic(){
  try{
    music.currentTime = START_AT_SECONDS;
    await music.play();
    musicStarted = true;
    musicBtn.textContent = "🔈 Music On";
  }catch(e){
    musicBtn.textContent = "🔊 Tap to Play";
  }
}

musicBtn.addEventListener("click", async () => {
  if(!musicStarted){
    await startMusic();
  }else{
    if(music.paused){
      await music.play();
      musicBtn.textContent = "🔈 Music On";
    }else{
      music.pause();
      musicBtn.textContent = "🔇 Muted";
    }
  }
});

// ====== BUTTONS ======
document.getElementById("openSurprise").addEventListener("click", async () => {
  await startMusic();
  showPage("page2");
});

document.getElementById("yesBtn").addEventListener("click", async () => {
  await startMusic();
  showPage("page3");
  typeLetter();
});

document.getElementById("nextToPhotos").addEventListener("click", async () => {
  await startMusic();
  showPage("page4");
});

document.getElementById("replayBtn").addEventListener("click", async () => {
  await startMusic();
  showPage("page1");
});

// ====== NO BUTTON ESCAPE FUN ======
const noBtn = document.getElementById("noBtn");
noBtn.addEventListener("mouseenter", moveNo);
noBtn.addEventListener("click", moveNo);
noBtn.addEventListener("touchstart", moveNo);

function moveNo(){
  const card = noBtn.closest(".card");
  const rect = card.getBoundingClientRect();

  const maxX = rect.width - noBtn.offsetWidth - 18;
  const maxY = rect.height - noBtn.offsetHeight - 18;

  const x = Math.max(8, Math.floor(Math.random() * maxX));
  const y = Math.max(8, Math.floor(Math.random() * maxY));

  noBtn.style.position = "absolute";
  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
}

// ====== LETTER (TYPING EFFECT) ======
const letterText = `My dear papa❤️
un kita naan ena solanum d elame kanavu Mari iruku adhukula 3 years aiiduchu haha

btw evlovo sanda vandhuruku periya periya fights lam namakulla vandhuruku konjam yosichu paaren
bt adhelam thandi unaku naa venum enaku ne venum nu evlo strong ah ninnurukom la d

indha 3 years ah yosichu paakum bodhu evlo love evlo pain evlo happy moments evlo breaking moments irundhurukunu apdiye mind la flashback Mari odudhu d

bt present ah nenaikum bodhu ena dhan aanalaum kadaisi varaikum unaku ava dhan da nu manasu soludhu.

Happy 3rd year love Anniversary my love❤️✨
I love you in every universe 🫵🏻💫`;

let typedOnce = false;
function typeLetter(){
  if(typedOnce) return;
  typedOnce = true;

  const box = document.getElementById("letterBox");
  box.textContent = "";

  let i = 0;
  const speed = 18;

  const timer = setInterval(() => {
    box.textContent += letterText[i];
    i++;

    if(i >= letterText.length){
      clearInterval(timer);
    }
  }, speed);
}

// ====== HEARTS BACKGROUND ======
const heartsWrap = document.querySelector(".hearts");

function spawnHeart(){
  const h = document.createElement("div");
  h.className = "heart";

  const left = Math.random() * 100;
  const size = 10 + Math.random() * 18;
  const duration = 5 + Math.random() * 6;

  h.style.left = left + "vw";
  h.style.bottom = "-20px";
  h.style.width = size + "px";
  h.style.height = size + "px";
  h.style.animationDuration = duration + "s";

  // random cute colors
  const colors = ["#ff4da6","#ff7bc3","#6ee7ff","#ffd1e8"];
  h.style.color = colors[Math.floor(Math.random() * colors.length)];

  heartsWrap.appendChild(h);

  setTimeout(() => h.remove(), duration * 1000);
}

setInterval(spawnHeart, 350);
