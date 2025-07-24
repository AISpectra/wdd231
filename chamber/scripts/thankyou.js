    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("last-modified").textContent = document.lastModified;

    const params = new URLSearchParams(window.location.search);
    const details = document.getElementById("submission-details");
    const fields = ["fname", "lname", "email", "phone", "organization", "timestamp"];

    fields.forEach(field => {
      if (params.has(field)) {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${field.charAt(0).toUpperCase() + field.slice(1)}:</strong> ${params.get(field)}`;
        details.appendChild(li);
      }
    });