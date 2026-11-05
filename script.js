const phishBtn = document.getElementById("phish-btn");
const safeBtn = document.getElementById("safe-btn");
const feedback = document.getElementById("feedback");

const isPhishing = true;
const explanation = "This is phishing. The sender's address looks odd, it creates panic with a 24-hour deadline, and it asks for your PIN. Real companies never ask for your PIN.";

function checkAnswer(userSaysPhishing) {
  if (userSaysPhishing === isPhishing) {
    feedback.textContent = "Correct! " + explanation;
  } else {
    feedback.textContent = "Not quite. " + explanation;
  }
}

phishBtn.addEventListener("click", function () {
  checkAnswer(true);
});

safeBtn.addEventListener("click", function () {
  checkAnswer(false);
});