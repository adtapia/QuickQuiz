// Dynamically update quiz results
document.addEventListener("DOMContentLoaded", () => {
    const scoreValue = 7; // Example: User scored 7 points
    const totalQuestions = 10; // Example: Total questions in the quiz
    const timesPerQuestion = [12, 15, 10, 8, 20, 25, 18, 16, 12, 10]; // Example: Time taken for each question in seconds
    const leaderboardData = [
      { username: "Alice", score: 92 },
      { username: "Bob", score: 85 },
      { username: "Charlie", score: 78 },
    ];
  
    // Update score
    document.getElementById("scoreValue").textContent = scoreValue;
    document.getElementById("totalQuestions").textContent = totalQuestions;
  
    // Populate time taken per question
    const questionTimesList = document.getElementById("questionTimes");
    timesPerQuestion.forEach((time, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = `Question ${index + 1}: ${time} seconds`;
      questionTimesList.appendChild(listItem);
    });

  });
  
  // Restart Quiz function
  function restartQuiz() {
    const userConfirmed = confirm("Are you sure you want to restart the quiz?");
    if (userConfirmed) {
      // Example: Redirect to quiz start page
      window.location.href = "quiz.html";
    }
  }
  
  // End Quiz function
  function endQuiz() {
    const userConfirmed = confirm("Are you sure you want to end the quiz?");
    if (userConfirmed) {
      alert("Thank you for participating in the quiz!");
      // Example: Redirect to homepage or close the quiz
      window.location.href = "index.html";
    }
  }
  
