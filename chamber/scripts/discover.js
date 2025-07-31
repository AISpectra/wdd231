const visitMessage = document.getElementById("visitMessage");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
  visitMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const diff = now - Number(lastVisit);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) {
    visitMessage.textContent = "Back so soon! Awesome!";
  } else if (days === 1) {
    visitMessage.textContent = "You last visited 1 day ago.";
  } else {
    visitMessage.textContent = `You last visited ${days} days ago.`;
  }
}

localStorage.setItem("lastVisit", now);

fetch("data/places.json")
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("placesContainer");
    data.places.forEach((place, index) => {
      const section = document.createElement("section");
      section.classList.add("card");
      section.style.gridArea = `item${index + 1}`;
      section.innerHTML = `
        <h2>${place.name}</h2>
        <figure>
          <img src="${place.image}" alt="${place.name}" width="300" height="200" loading="lazy">
        </figure>
        <address>${place.address}</address>
        <p>${place.description}</p>
        <button>Learn More</button>
      `;
      container.appendChild(section);
    });
  });
