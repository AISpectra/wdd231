// modal.js
const modal     = document.getElementById('modal');
const openBtn   = document.getElementById('openModal');
const closeBtn  = document.getElementById('closeModal');
const menuBtn   = document.getElementById('menuBtn');
const navLinks  = document.getElementById('navLinks');

// Hamburguesa
menuBtn?.addEventListener('click', () => {
  navLinks?.classList.toggle('show');
});

// Abrir modal
openBtn?.addEventListener('click', () => {
  modal?.classList.add('show');
  modal?.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; // evita scroll del fondo
});

// Función cerrar
function closeModal() {
  modal?.classList.remove('show');
  modal?.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// Cerrar con botón
closeBtn?.addEventListener('click', closeModal);

// Cerrar clic fuera del cuadro
modal?.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// Cerrar con Escape
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal?.classList.contains('show')) {
    closeModal();
  }
});
