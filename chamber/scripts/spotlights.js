async function loadSpotlights() {
  try {
    const response = await fetch("data/members.json");
    const data = await response.json();

    const goldSilver = data.members.filter(member =>
      member.membership.toLowerCase() === "gold" || member.membership.toLowerCase() === "silver"
    );

    const shuffled = goldSilver.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    const container = document.getElementById("spotlights-container");
    container.innerHTML = "";

    selected.forEach(member => {
      const card = document.createElement("div");
      card.classList.add("spotlight");

      card.innerHTML = `
        <img src="${member.image}" alt="${member.name}" loading="lazy" />
        <h3>${member.name}</h3>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><a href="${member.website}" target="_blank">Visit Website</a></p>
        <p class="badge ${member.membership.toLowerCase()}">${member.membership}</p>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error("Error loading spotlights:", error);
  }
}

loadSpotlights();
