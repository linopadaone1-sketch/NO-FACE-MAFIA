/* ===================== DATA ===================== */
const artists = [
  { name:"Lino Padaone", role:"Producteur / Artiste", bio:"Bio à venir." },
  { name:"Blackbenz", role:"Manager", bio:"Bio à venir." },
];

/* ===================== PORTRAIT GENERATOR ===================== */
function makePortrait(seed, initials){
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" fill="#0f100d"/>
    <circle cx="${30+seed*13%40}" cy="${25+seed*17%30}" r="60" fill="rgba(47,122,74,0.35)"/>
    <text x="50%" y="58%" text-anchor="middle" font-family="Anton, sans-serif" font-size="30" fill="#f4f3ee">${initials}</text>
  </svg>`;
}

/* ===================== RENDER ARTISTS ===================== */
const artistStrip = document.getElementById('artistStrip');
if (artistStrip) {
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
}