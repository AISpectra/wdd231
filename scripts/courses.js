const courses = [
  { code: "WDD130", name: "Web Fundamentals", credits: 3, type: "WDD", completed: true },
  { code: "WDD131", name: "Dynamic Web Fundamentals", credits: 3, type: "WDD", completed: true },
  { code: "WDD231", name: "Front-end Web Development I", credits: 3, type: "WDD", completed: false },
  { code: "CSE110", name: "Programming Building Blocks", credits: 2, type: "CSE", completed: false },
  { code: "CSE210", name: "Programming with Classes", credits: 4, type: "CSE", completed: true },
  { code: "CSE310", name: "Data Structures", credits: 3, type: "CSE", completed: false },
];

const container = document.querySelector("#course-list");
const creditsDisplay = document.querySelector("#total-credits");

function displayCourses(filter = "ALL") {
  container.innerHTML = "";

  const filtered = filter === "ALL" ? courses : courses.filter(c => c.type === filter);
  let totalCredits = 0;

  filtered.forEach(course => {
    const section = document.createElement("section");
    section.classList.add("course");
    if (course.completed) section.classList.add("completed");

    section.innerHTML = `
      <h3>${course.code}</h3>
      <p>${course.name}</p>
      <p><strong>Credits:</strong> ${course.credits}</p>
    `;
    container.appendChild(section);
    totalCredits += course.credits;
  });

  creditsDisplay.textContent = `Total Credits: ${totalCredits}`;
}


document.querySelector("#all").addEventListener("click", () => displayCourses("ALL"));
document.querySelector("#wdd").addEventListener("click", () => displayCourses("WDD"));
document.querySelector("#cse").addEventListener("click", () => displayCourses("CSE"));


displayCourses();
