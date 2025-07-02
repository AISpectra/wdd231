document.addEventListener("DOMContentLoaded", () => {
  const navButton = document.querySelector('#nav-button');
  const navBar = document.querySelector('#nav-bar');

  if (navButton && navBar) {
    navButton.addEventListener('click', () => {
      navButton.classList.toggle('show');
      navBar.classList.toggle('show');
    });
  }

  const lastModified = document.getElementById("lastModified");
  if (lastModified) {
    lastModified.textContent = document.lastModified;
  }
});
