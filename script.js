// Campus Lens — client-side JavaScript demonstrations.
// Covers variables, data types, functions, methods, events, DOM and validation.
"use strict";

const currentYear = new Date().getFullYear();
const yearElement = document.getElementById("year");
if (yearElement) yearElement.textContent = currentYear;

// Mobile navigation: event listener + DOM class manipulation.
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", function () {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// Demo newsletter form: prevent reload, validate, and show a DOM message.
// It deliberately does not transmit or store personal information.
const quickForm = document.getElementById("quickForm");
if (quickForm) {
  quickForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const emailInput = document.getElementById("quickEmail");
    const message = document.getElementById("quickMessage");
    if (emailInput.checkValidity()) {
      message.textContent = "Thanks! This is a front-end demo; no data was sent or saved.";
      message.classList.add("success-message");
      quickForm.reset();
    } else {
      message.textContent = "Please enter a valid email address.";
    }
  });
}

// Registration form validation using conditionals, operators and built-in methods.
const registrationForm = document.getElementById("registrationForm");
if (registrationForm) {
  registrationForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("studentName").value.trim();
    const roll = document.getElementById("rollNumber").value.trim();
    const dob = document.getElementById("dob").value;
    const email = document.getElementById("studentEmail").value.trim();
    const course = document.getElementById("course").value;
    const feedback = document.getElementById("registrationResult");
    const namePattern = /^[A-Za-z ]+$/;
    const rollPattern = /^\d{7}$/;

    if (!namePattern.test(name)) {
      feedback.textContent = "Name must contain letters and spaces only.";
      return;
    }
    if (!rollPattern.test(roll)) {
      feedback.textContent = "For this practice form, roll number must be 7 digits.";
      return;
    }
    if (!dob) {
      feedback.textContent = "Please select your date of birth.";
      return;
    }
    if (!email || !document.getElementById("studentEmail").checkValidity()) {
      feedback.textContent = "Please enter a valid email address.";
      return;
    }
    if (!course) {
      feedback.textContent = "Please choose a course.";
      return;
    }
    feedback.textContent = "Validation successful! This demonstration does not submit data to a server.";
  });
}

// Lab helper: safe integer conversion and output via textContent (not innerHTML).
function getNumber(id) {
  const raw = document.getElementById(id).value.trim();
  if (raw === "") return null;
  const value = Number(raw);
  return Number.isFinite(value) ? value : null;
}
function showOutput(id, message) {
  document.getElementById(id).textContent = message;
}
const multiplyButton = document.getElementById("multiplyButton");
if (multiplyButton) {
  multiplyButton.addEventListener("click", function () {
    const n = getNumber("multiplyInput");
    if (n === null || !Number.isInteger(n)) {
      showOutput("multiplyOutput", "Enter a valid whole number.");
      return;
    }
    let rows = [];
    for (let i = 1; i <= 10; i++) rows.push(`${n} × ${i} = ${n * i}`);
    showOutput("multiplyOutput", rows.join("\\n"));
  });
}
const largestButton = document.getElementById("largestButton");
if (largestButton) {
  largestButton.addEventListener("click", function () {
    const a = getNumber("largestA"), b = getNumber("largestB"), c = getNumber("largestC");
    if ([a,b,c].some(value => value === null)) {
      showOutput("largestOutput", "Enter all three numbers.");
      return;
    }
    showOutput("largestOutput", `Largest number: ${Math.max(a,b,c)}`);
  });
}
const factorialButton = document.getElementById("factorialButton");
if (factorialButton) {
  factorialButton.addEventListener("click", function () {
    const n = getNumber("factorialInput");
    if (n === null || !Number.isInteger(n) || n < 0 || n > 170) {
      showOutput("factorialOutput", "Enter a whole number from 0 to 170.");
      return;
    }
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    showOutput("factorialOutput", `${n}! = ${result}`);
  });
}
const sumAverageButton = document.getElementById("sumAverageButton");
if (sumAverageButton) {
  sumAverageButton.addEventListener("click", function () {
    const raw = document.getElementById("positiveNumbers").value.trim();
    if (!raw) {
      showOutput("sumAverageOutput", "Enter positive numbers separated by commas.");
      return;
    }
    const numbers = raw.split(",").map(value => Number(value.trim()));
    if (numbers.some(value => !Number.isFinite(value) || value <= 0)) {
      showOutput("sumAverageOutput", "Use positive numbers only, separated by commas.");
      return;
    }
    const sum = numbers.reduce((total, value) => total + value, 0);
    showOutput("sumAverageOutput", `Count: ${numbers.length} | Sum: ${sum} | Average: ${(sum / numbers.length).toFixed(2)}`);
  });
}

// Frame-like two-panel navigation built with modern HTML. The syllabus asks for
// frames; iframe/frameset are legacy patterns, so this demonstrates the same idea
// without using obsolete frameset markup.
const frameButtons = document.querySelectorAll("[data-frame-topic]");
if (frameButtons.length) {
  const frameTitle = document.getElementById("frameTitle");
  const frameText = document.getElementById("frameText");
  const frameContent = {
    courses: ["Courses & learning", "A course page can list subjects, learning outcomes, resources and links. This panel changes when a menu item is selected."],
    activities: ["Student activities", "Clubs, student-led projects, workshops and cultural activities can be represented with lists, cards and internal links."],
    facilities: ["Campus facilities", "A campus guide can describe the library, study areas, canteen, common rooms and accessibility information."]
  };
  frameButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const item = frameContent[button.dataset.frameTopic];
      frameTitle.textContent = item[0];
      frameText.textContent = item[1];
    });
  });
}
