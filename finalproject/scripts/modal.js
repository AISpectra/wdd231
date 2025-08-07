const openBtn = document.querySelector("#openModal");
const closeBtn = document.querySelector("#closeModal");
const modal = document.querySelector("#modal");

document.getElementById("menuBtn").addEventListener("click", () => {
  document.getElementById("navLinks").classList.toggle("show");
});

openBtn.addEventListener("click", () => {
  modal.style.display = "block";
  modal.setAttribute("aria-hidden", "false");
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
  }
});
