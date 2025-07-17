const container = document.getElementById("members-container");
const gridBtn = document.getElementById("grid-view");
const listBtn = document.getElementById("list-view");


async function loadMembers() {
  try {
    const response = await fetch("data/members.json");
    const data = await response.json();
    displayMembers(data.members);
  } catch (error) {
    console.error("Error loading member data:", error);
  }
}

function displayMembers(members) {
  container.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement("section");
    card.classList.add("member-card");

    card.innerHTML = `
      <img src="${member.image}" alt="${member.name} logo" loading="lazy" />
      <h3>${member.name}</h3>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><a href="${member.website}" target="_blank">Visit Website</a></p>
      <p class="badge ${member.membership.toLowerCase()}">${member.membership}</p>
    `;

    container.appendChild(card);
  });
}


gridBtn.addEventListener("click", () => {
  container.classList.add("grid");
  container.classList.remove("list");
});

listBtn.addEventListener("click", () => {
  container.classList.add("list");
  container.classList.remove("grid");
});


document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("last-modified").textContent = document.lastModified;


loadMembers();
