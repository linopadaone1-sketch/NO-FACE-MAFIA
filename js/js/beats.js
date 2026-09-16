/* ===================== DATA ===================== */
const KEY_FREQ = {
  "Fa# min": 92.50, "Do min": 65.41, "Sol min": 98.00,
  "Ré min": 73.42, "La min": 110.00, "Mib maj": 77.78
};

const beats = [
  { title:"Ombre Urbaine", prod:"NOIR", bpm:140, key:"Fa# min", genre:"Drill", free:false, pattern:"drill" },
  { title:"Sang Froid", prod:"VENOM", bpm:132, key:"Do min", genre:"Trap", free:false, pattern:"trap" },
  { title:"Cage Dorée", prod:"REAPER", bpm:90, key:"Sol min", genre:"Boom Bap", free:true, pattern:"boombap" },
  { title:"Silence Radio", prod:"NOIR", bpm:150, key:"Ré min", genre:"Drill", free:false, pattern:"drill" },
  { title:"Marée Noire", prod:"KRONOS", bpm:128, key:"La min", genre:"Trap Soul", free:false, pattern:"trap" },
  { title:"Dernier Refuge", prod:"VENOM", bpm:85, key:"Mib maj", genre:"Boom Bap", free:true, pattern:"boombap" },
];

const artists = [
  { name:"Lino Padaone", role:"Producteur / Artiste", bio:"Bio à venir." },
  { name:"Blackbenz", role:"Manager", bio:"Bio à venir." },
];

// Aucun projet réel confirmé pour l'instant : la section affiche un emplacement
// en attente plutôt que des faux projets. Ajoute tes vrais projets ici, par
// exemple : { type:"EP", title:"...", year:"2026", by:"...", tracks:"... titres", desc:"..." }
const projects = [];

/* ===================== COVER GENERATOR (SVG, pas d'images externes) ===================== */
function makeCover(seed, label, big){
  const hue = (seed*47)%360;
  const shapes = [
    `<circle cx="${20+seed*15%60}" cy="${30+seed*11%50}" r="${34+seed*7%20}" fill="rgba(95,214,133,${0.12+((seed%3)*0.05)})"/>`,
    `<rect x="-10" y="${40+seed*9%40}" width="140" height="${8+seed%10}" fill="rgba(244,243,238,0.06)" transform="rotate(-8 60 60)"/>`,
    `<polygon points="0,100 100,${60+seed*5%20} 100,100" fill="rgba(47,122,74,0.5)"/>`
  ];
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" fill="#131510"/>
    ${shapes.join('')}
    <text x="50%" y="62%" text-anchor="middle" font-family="Anton, sans-serif" font-size="${big?46:40}" fill="rgba(244,243,238,0.9)">${label}</text>
    <rect width="100" height="100" fill="none" stroke="rgba(244,243,238,0.08)"/>
  </svg>`;
}

function makePortrait(seed, initials){
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" fill="#0f100d"/>
    <circle cx="${30+seed*13%40}" cy="${25+seed*17%30}" r="60" fill="rgba(47,122,74,0.35)"/>
    <text x="50%" y="58%" text-anchor="middle" font-family="Anton, sans-serif" font-size="30" fill="#f4f3ee">${initials}</text>
  </svg>`;
}

/* ===================== RENDER BEATS ===================== */
const beatsList = document.getElementById('beatsList');
beats.forEach((b, i) => {
  const row = document.createElement('div');
  row.className = 'beat-row';
  row.dataset.index = i;
  const bars = Array.from({length:18}, (_,k)=>`<i style="height:${6+((i*7+k*5)%18)}px"></i>`).join('');
  row.innerHTML = `
    <span class="beat-index">${String(i+1).padStart(2,'0')}</span>
    <div class="beat-cover">${makeCover(i, b.title[0])}</div>
    <div class="beat-title"><strong>${b.title}</strong><small>Prod. ${b.prod}</small></div>
    <div class="beat-meta">
      <span class="tag pending">Exemple</span>
      <span class="tag">${b.bpm} BPM</span>
      <span class="tag">${b.key}</span>
      <span class="tag">${b.genre}</span>
      ${b.free ? '<span class="tag free">Libre</span>' : ''}
    </div>
    <div class="waveform">${bars}</div>
    <div class="beat-actions">
      <button class="icon-btn play-btn" data-play="${i}" aria-label="Écouter">
        <svg class="icon-play" viewBox="0 0 10 10"><polygon points="0,0 10,5 0,10"/></svg>
        <svg class="icon-pause" viewBox="0 0 10 10"><rect x="0" y="0" width="3" height="10"/><rect x="6" y="0" width="3" height="10"/></svg>
      </button>
      <button class="buy-btn" data-buy="${i}">Acheter</button>
      ${b.free ? `<button class="icon-btn" data-download="${i}" aria-label="Télécharger"><svg viewBox="0 0 24 24"><path d="M12 3v11m0 0l-4-4m4 4l4-4M5 20h14"/></svg></button>` : ''}
    </div>
  `;
  beatsList.appendChild(row);
});

/* ===================== RENDER ARTISTS ===================== */
const artistStrip = document.getElementById('artistStrip');
artists.forEach((a,i)=>{
  const initials = a.name.split(' ').map(w=>w[0]).join('').slice(0,2);
  const card = document.createElement('div');
  card.className = 'artist-card';
  card.innerHTML = `
    <div class="artist-photo">${makePortrait(i, initials)}</div>
    <h3>${a.name}</h3>
    <div class="role">${a.role}</div>
    <p>${a.bio}</p>
  `;
  artistStrip.appendChild(card);
});

/* ===================== RENDER PROJECTS ===================== */
const projectsList = document.getElementById('projectsList');
if(projects.length === 0){
  projectsList.innerHTML = `
    <div class="empty-state">
      <strong>Aucun projet publié pour l'instant</strong>
      Les albums, EPs et mixtapes de NO FACE MAFIA apparaîtront ici dès qu'ils seront ajoutés.
    </div>
  `;
} else {
  projects.forEach((p,i)=>{
    const el = document.createElement('div');
    el.className = 'project';
    el.innerHTML = `
      <div class="project-cover">${makeCover(i+10, p.title[0], true)}</div>
      <div class="project-info">
        <div class="p-type">${p.type} · ${p.year}</div>
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="project-tracks">${p.by} — ${p.tracks}</div>
        <button class="btn btn-ghost" data-toast="Bientôt disponible : page projet détaillée avec toutes les pistes.">Écouter le projet</button>
      </div>
    `;
    projectsList.appendChild(el);
  });
}

/* ===================== AUDIO ENGINE (synthé de démo) ===================== */
let audioCtx = null;
let currentToken = 0;
let currentIndex = null;
let loopStart = 0;
let loopDuration = 0;
let rafId = null;

function ensureCtx(){
  if(!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if(audioCtx.state === 'suspended') audioCtx.resume();
}

function noiseBuffer(){
  const len = audioCtx.sampleRate * 0.2;
  const buf = audioCtx.createBuffer(1, len, audioCtx.sampleRate);
  const data = buf.getChannelData(0);
  for(let i=0;i<len;i++) data[i] = Math.random()*2-1;
  return buf;
}

function playKick(t){
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(150, t);
  osc.frequency.exponentialRampToValueAtTime(40, t+0.15);
  gain.gain.setValueAtTime(0.9, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t+0.18);
  osc.connect(gain).connect(audioCtx.destination);
  osc.start(t); osc.stop(t+0.2);
}

function playHat(t, vol){
  const src = audioCtx.createBufferSource();
  src.buffer = noiseBuffer();
  const filter = audioCtx.createBiquadFilter();
  filter.type='highpass'; filter.frequency.value = 7000;
  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(vol||0.25, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t+0.05);
  src.connect(filter).connect(gain).connect(audioCtx.destination);
  src.start(t); src.stop(t+0.06);
}

function playSnare(t){
  const src = audioCtx.createBufferSource();
  src.buffer = noiseBuffer();
  const filter = audioCtx.createBiquadFilter();
  filter.type='bandpass'; filter.frequency.value = 1800;
  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0.5, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t+0.15);
  src.connect(filter).connect(gain).connect(audioCtx.destination);
  src.start(t); src.stop(t+0.16);
}

function playBass(t, freq, dur){
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(freq, t);
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.linearRampToValueAtTime(0.35, t+0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, t+dur);
  osc.connect(gain).connect(audioCtx.destination);
  osc.start(t); osc.stop(t+dur+0.05);
}

const PATTERNS = {
  drill:   { kick:[0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0], hat:[1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1], snare:[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0] },
  trap:    { kick:[1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0], hat:[1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1], snare:[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0] },
  boombap: { kick:[1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0], hat:[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0], snare:[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0] },
};

function stopPlayback(){
  currentToken++;
  if(rafId) cancelAnimationFrame(rafId);
  document.querySelectorAll('.beat-row.playing').forEach(r=>{
    r.classList.remove('playing');
    r.querySelector('.play-btn')?.classList.remove('is-playing');
  });
  document.getElementById('playerBar').classList.remove('active');
  currentIndex = null;
}

function scheduleLoop(idx, token){
  const b = beats[idx];
  const pat = PATTERNS[b.pattern];
  const stepTime = (60/b.bpm)/4;
  const bars = 4;
  const totalSteps = bars*16;
  loopDuration = stepTime*totalSteps;
  const startAt = audioCtx.currentTime + 0.05;
  loopStart = startAt;

  for(let s=0; s<totalSteps; s++){
    const stepInBar = s%16;
    const t = startAt + s*stepTime;
    if(pat.kick[stepInBar]) playKick(t);
    if(pat.hat[stepInBar]) playHat(t, 0.22);
    if(pat.snare[stepInBar]) playSnare(t);
    if(stepInBar===0 || stepInBar===8) playBass(t, KEY_FREQ[b.key], stepTime*3);
  }

  setTimeout(()=>{
    if(token === currentToken) scheduleLoop(idx, token);
  }, loopDuration*1000);
}

function updateProgress(){
  if(currentIndex===null) return;
  const elapsed = (audioCtx.currentTime - loopStart) % loopDuration;
  const pct = Math.max(0, Math.min(100, (elapsed/loopDuration)*100));
  document.getElementById('playerFill').style.width = pct+'%';
  const secs = Math.floor(elapsed);
  document.getElementById('playerTime').textContent = '0:'+String(secs).padStart(2,'0');
  rafId = requestAnimationFrame(updateProgress);
}

function playBeat(idx){
  ensureCtx();
  if(currentIndex === idx){ stopPlayback(); return; }
  stopPlayback();
  currentIndex = idx;
  const token = ++currentToken;
  const b = beats[idx];

  const row = document.querySelector(`.beat-row[data-index="${idx}"]`);
  row.classList.add('playing');
  row.querySelector('.play-btn').classList.add('is-playing');

  document.getElementById('playerTitle').textContent = b.title;
  document.getElementById('playerSub').textContent = `Prod. ${b.prod} · ${b.bpm} BPM`;
  document.getElementById('playerCover').innerHTML = makeCover(idx, b.title[0]);
  document.getElementById('playerBar').classList.add('active');

  scheduleLoop(idx, token);
  rafId = requestAnimationFrame(updateProgress);
}

beatsList.addEventListener('click', (e)=>{
  const playBtn = e.target.closest('[data-play]');
  const buyBtn = e.target.closest('[data-buy]');
  const dlBtn = e.target.closest('[data-download]');
  if(playBtn) playBeat(parseInt(playBtn.dataset.play));
  if(buyBtn) openBuyModal(parseInt(buyBtn.dataset.buy));
  if(dlBtn) handleDownload(parseInt(dlBtn.dataset.download));
});

document.getElementById('playerToggle').addEventListener('click', ()=>{
  if(currentIndex!==null) stopPlayback();
});

/* ===================== MODAL ACHAT ===================== */
const modalOverlay = document.getElementById('modalOverlay');
function openBuyModal(idx){
  const b = beats[idx];
  document.getElementById('modalTitle').textContent = b.title;
  document.getElementById('modalSub').textContent = `Prod. ${b.prod} · ${b.bpm} BPM · ${b.key}`;
  document.getElementById('modalTiers').innerHTML = `
    <div class="tier"><div><b>Lease MP3</b><span>Usage non-exclusif, streaming</span></div><strong>29€</strong></div>
    <div class="tier"><div><b>Lease WAV</b><span>Qualité studio, usage commercial limité</span></div><strong>59€</strong></div>
    <div class="tier"><div><b>Trackout</b><span>Fichiers séparés + exclusivité</span></div><strong>149€</strong></div>
  `;
  modalOverlay.classList.add('open');
}
document.getElementById('modalClose').addEventListener('click', ()=>modalOverlay.classList.remove('open'));
modalOverlay.addEventListener('click', (e)=>{ if(e.target===modalOverlay) modalOverlay.classList.remove('open'); });

function handleDownload(idx){
  showToast(`"${beats[idx].title}" : ajoute ton fichier MP3 dans le dossier du beat pour activer le vrai téléchargement.`);
}

/* ===================== TOAST ===================== */
const toastEl = document.getElementById('toast');
let toastTimer = null;
function showToast(msg){
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>toastEl.classList.remove('show'), 3200);
}
document.addEventListener('click', (e)=>{
  const t = e.target.closest('[data-toast]');
  if(t) showToast(t.dataset.toast);
});

/* ===================== NAV MOBILE ===================== */
const burgerBtn = document.getElementById('burgerBtn');
const mobileNav = document.getElementById('mobileNav');
burgerBtn.addEventListener('click', ()=>mobileNav.classList.toggle('open'));
mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>mobileNav.classList.remove('open')));

/* ===================== HEADER SCROLL ===================== */
const header = document.getElementById('site-header');
window.addEventListener('scroll', ()=>{
  header.classList.toggle('scrolled', window.scrollY > 30);
});

/* ===================== CONTACT FORM (mailto, sans backend) ===================== */
document.getElementById('contactForm').addEventListener('submit', (e)=>{
  e.preventDefault();
  const f = e.target;
  const subject = encodeURIComponent(`Message de ${f.nom.value} via le site`);
  const body = encodeURIComponent(`${f.message.value}\n\n— ${f.nom.value} (${f.email.value})`);
  window.location.href = `mailto:linopadaone1@gmail.com?subject=${subject}&body=${body}`;
  showToast('Ton client mail va s\'ouvrir pour envoyer le message.');
});