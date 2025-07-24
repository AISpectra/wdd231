    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("last-modified").textContent = document.lastModified;
    document.getElementById("timestamp").value = new Date().toISOString();

    
    document.querySelectorAll(".card a").forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        const modal = document.querySelector(link.getAttribute("href"));
        modal.showModal();
      });
    });