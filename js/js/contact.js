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

/* ===================== CONTACT FORM ===================== */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const f = e.target;
    const subject = encodeURIComponent(`Message de ${f.nom.value} via le site`);
    const body = encodeURIComponent(`${f.message.value}\n\n— ${f.nom.value} (${f.email.value})`);
    window.location.href = `mailto:linopadaone1@gmail.com?subject=${subject}&body=${body}`;
    showToast('Ton client mail va s\'ouvrir pour envoyer le message.');
  });
}