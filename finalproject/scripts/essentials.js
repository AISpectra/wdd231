const container = document.querySelector('#items-container');

document.getElementById("menuBtn").addEventListener("click", () => {
  document.getElementById("navLinks").classList.toggle("show");
});


async function loadEssentials() {
  try {
    const response = await fetch('../data/essentials.json');
    if (!response.ok) throw new Error('Network error');
    const items = await response.json();

    items.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('item-card');
      card.innerHTML = `
        <h3>${item.name}</h3>
        <p><strong>Category:</strong> ${item.category}</p>
        <p><strong>Quantity:</strong> ${item.quantity}</p>
        <p><strong>Notes:</strong> ${item.notes}</p>
      `;
      container.appendChild(card);
    });

    // Guardar en localStorage (ejemplo de preferencia)
    localStorage.setItem("lastVisitEssentials", new Date().toISOString());

  } catch (error) {
    container.innerHTML = `<p class="error">Error loading essentials: ${error.message}</p>`;
    console.error(error);
  }
}

loadEssentials();
