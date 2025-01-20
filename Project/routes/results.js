// results.js
document.addEventListener("DOMContentLoaded", () => {
  // Example: read the score from the DOM
  const scoreValue = parseInt(document.getElementById("scoreValue").textContent, 10);
  const totalQuestions = parseInt(document.getElementById("totalQuestions").textContent, 10);

  // Example times. Replace with real tracking if you want actual user timings.
  const timesPerQuestion = [12, 15, 10, 8, 20, 25, 18, 16, 12, 10];

  // Populate time per question list
  const questionTimesList = document.getElementById("questionTimes");
  timesPerQuestion.forEach((time, index) => {
    const li = document.createElement("li");
    li.textContent = `Question ${index + 1}: ${time} seconds`;
    questionTimesList.appendChild(li);
  });
});

/** Restart Quiz: go back to the quiz start */
function restartQuiz() {
  const userConfirmed = confirm("Are you sure you want to restart the quiz?");
  if (userConfirmed) {
    window.location.href = "/quiz"; 
  }
}

/** End Quiz: go to home page (or do whatever you want) */
function endQuiz() {
  const userConfirmed = confirm("Are you sure you want to end the quiz?");
  if (userConfirmed) {
    alert("Thank you for participating in the quiz!");
    window.location.href = "/";
  }
}
