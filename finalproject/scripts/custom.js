const form = document.querySelector("#bagForm");
const modal = document.querySelector("#modal");
const confirmBtn = document.querySelector("#confirm");
const cancelBtn = document.querySelector("#cancel");

document.getElementById("menuBtn").addEventListener("click", () => {
  document.getElementById("navLinks").classList.toggle("show");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  modal.classList.remove("hidden");
});

confirmBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
  localStorage.setItem("customFormSaved", "true"); // ejemplo
  form.submit();
});

cancelBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});
