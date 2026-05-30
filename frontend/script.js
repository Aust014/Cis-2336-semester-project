const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", function () {
  if (navMenu.style.display === "none") {
    navMenu.style.display = "block";
  } else {
    navMenu.style.display = "none";
  }
});

const questions = document.querySelectorAll(".faq-question");

questions.forEach((q) => {
  q.addEventListener("click", function () {
    const answer = this.nextElementSibling;

    if (answer.style.display === "none") {
      answer.style.display = "block";
    } else {
      answer.style.display = "none";
    }
  });
});

const bookingForm = document.getElementById("booking-form");
const formMessage = document.getElementById("form-message");

if (bookingForm) {
  bookingForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const room = document.getElementById("room").value;
    const date = document.getElementById("date").value;

    if (name === "" || email === "" || room === "" || date === "") {
      formMessage.textContent = "Please fill in all required fields.";
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/book-room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, room, date })
      });

      const data = await response.json();
      formMessage.textContent = data.message;
    } catch (error) {
      formMessage.textContent = "Error connecting to backend server.";
    }
  });
}