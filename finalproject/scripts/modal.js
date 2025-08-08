
const modal     = document.getElementById('modal');
const openBtn   = document.getElementById('openModal');
const closeBtn  = document.getElementById('closeModal');
const menuBtn   = document.getElementById('menuBtn');
const navLinks  = document.getElementById('navLinks');


menuBtn?.addEventListener('click', () => {
  navLinks?.classList.toggle('show');
});


openBtn?.addEventListener('click', () => {
  modal?.classList.add('show');
  modal?.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; 
});


function closeModal() {
  modal?.classList.remove('show');
  modal?.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}


closeBtn?.addEventListener('click', closeModal);


modal?.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});


window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal?.classList.contains('show')) {
    closeModal();
  }
});
