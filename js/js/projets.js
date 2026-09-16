/* ===================== DATA ===================== */
// Ajoute tes vrais projets ici quand tu en as.
// Exemple : { type:"EP", title:"Mon EP", year:"2026", by:"Lino Padaone", tracks:"5 titres", desc:"Description..." }
const projects = [];

/* ===================== COVER GENERATOR ===================== */
function makeCover(seed, label, big){
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

/* ===================== TOAST ===================== */
const toastEl = document.getElementById('toast');
let toastTimer = null;
function showToast(msg){
  if(!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>toastEl.classList.remove('show'), 3200);
}
document.addEventListener('click', (e)=>{
  const t = e.target.closest('[data-toast]');
  if(t) showToast(t.dataset.toast);
});

/* ===================== RENDER PROJECTS ===================== */
const projectsList = document.getElementById('projectsList');
if (projectsList) {
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
}