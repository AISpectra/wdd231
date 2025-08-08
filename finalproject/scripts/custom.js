


const menuBtn  = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn?.addEventListener("click", () => {
  navLinks?.classList.toggle("show");
});


const form      = document.getElementById("bagForm");
const modal     = document.getElementById("modal");
const confirmBtn = document.getElementById("confirm");
const cancelBtn  = document.getElementById("cancel");


const nameInput  = document.getElementById("name");
const regionSel  = document.getElementById("region");
const needsBoxes = [...document.querySelectorAll('input[name="needs"]')];


(function restorePrefs() {
  try {
    const saved = JSON.parse(localStorage.getItem("gobag-custom") || "{}");
    if (saved.name)   nameInput.value = saved.name;
    if (saved.region) regionSel.value = saved.region;
    if (Array.isArray(saved.needs)) {
      needsBoxes.forEach(cb => (cb.checked = saved.needs.includes(cb.value)));
    }
  } catch (_) {}
})();

function savePrefs() {
  const selectedNeeds = needsBoxes.filter(cb => cb.checked).map(cb => cb.value);
  localStorage.setItem(
    "gobag-custom",
    JSON.stringify({
      name: nameInput.value.trim(),
      region: regionSel.value,
      needs: selectedNeeds,
    })
  );
}


function openModal() {
  modal.classList.remove("hidden");
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.classList.remove("show");
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
}


form.addEventListener("submit", (e) => {
  e.preventDefault();
  openModal();
});


confirmBtn.addEventListener("click", () => {
  savePrefs();
  closeModal();
  form.submit(); 
});


cancelBtn.addEventListener("click", closeModal);


modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});


window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("show")) {
    closeModal();
  }
});
