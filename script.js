
// ============================================
// SPOT THE PHISH
// DUCHESS TECH SPACE
// Created by Grace - The Duchess of Hackers
// ============================================

// 1. QUIZ QUESTIONS

const questions = [

  {
    type: "SMS",
    title: "A Mobile Money alert!",
    from: "security@momo-alert.example",
    text: "Your Mobile Money account will be suspended in 2 hours. Send your PIN immediately to restore access.",
    isPhishing: true,
    explanation: "This is phishing! It creates urgency and asks for your PIN. Never share your Mobile Money PIN or OTP with anyone."
  },

  {
    type: "EMAIL",
    title: "A school announcement",
    from: "admin@school-portal.example",
    text: "Your examination timetable is now available. Please sign in through your school's usual student portal to view it.",
    isPhishing: false,
    explanation: "This is a safe example. It provides ordinary information and directs students to their usual portal without requesting sensitive information."
  },

  {
    type: "WHATSAPP",
    title: "A surprise prize!",
    from: "prize-team@lucky-draw.example",
    text: "Congratulations! You have won GHS 10,000! Pay GHS 100 as a processing fee to receive your prize today.",
    isPhishing: true,
    explanation: "This is a prize scam. Unexpected winnings and advance payment requests are major warning signs."
  },

  {
    type: "EMAIL",
    title: "A suspicious bank alert",
    from: "support@bank-security.example",
    text: "Your account has been restricted. Download the attached file to unlock your banking access.",
    isPhishing: true,
    explanation: "Unexpected attachments can contain malware. Don't open suspicious files. Verify account problems through your bank's official channels."
  },

  {
    type: "SMS",
    title: "Your delivery update",
    from: "delivery@parcel-service.example",
    text: "Your parcel has been dispatched. Please check your order confirmation or the delivery company's official app for updates.",
    isPhishing: false,
    explanation: "This is a safe example. It gives an ordinary delivery update without demanding payment or sensitive information."
  },

  {
    type: "WHATSAPP",
    title: "Your friend needs help!",
    from: "unknown-number@chat-alert.example",
    text: "Hello! I have lost access to my account. Please send me the verification code you just received so I can log in.",
    isPhishing: true,
    explanation: "Never share verification codes. Someone may be trying to take over an account. Contact your friend through another trusted channel."
  },

  {
    type: "WEBSITE",
    title: "A website asking for your details",
    from: "free-gift-claim.example",
    text: "Welcome! You have been selected for a free smartphone. Enter your bank details, password and OTP to complete your registration.",
    isPhishing: true,
    explanation: "This fake website requests sensitive financial information and promises an unexpected reward. Never enter your PIN, password or OTP into an unverified website."
  },

  {
    type: "EMAIL",
    title: "A meeting reminder",
    from: "events@community-hub.example",
    text: "Reminder: Our online community session starts tomorrow at 4 PM. Please check the event details you previously received.",
    isPhishing: false,
    explanation: "This is a safe example. It is a normal reminder and doesn't request money, passwords or sensitive information."
  },

  {
    type: "SMS",
    title: "An urgent account warning",
    from: "verify@account-security.example",
    text: "We detected unusual activity. Reply with your account password and OTP within 10 minutes or your account will be permanently deleted.",
    isPhishing: true,
    explanation: "This is phishing. It combines fear, urgency and requests for confidential information. Never share your password or OTP."
  },

  {
    type: "WHATSAPP",
    title: "A community announcement",
    from: "updates@duchess-community.example",
    text: "Hello! Our beginner cybersecurity session is scheduled for Sunday. Please check the announcement in your usual community group for the details.",
    isPhishing: false,
    explanation: "This is a safe example. It shares an ordinary community announcement and doesn't ask for sensitive information or payments."
  }

];

// 2. GAME VARIABLES

let current = 0;
let score = 0;
let playerName = "";

// 3. GET HTML ELEMENTS

const welcomeScreen = document.getElementById("welcome-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultsScreen = document.getElementById("results-screen");

const playerNameInput = document.getElementById("player-name");
const startBtn = document.getElementById("start-btn");

const messageType = document.getElementById("message-type");
const scenarioTitle = document.getElementById("scenario-title");
const sender = document.getElementById("sender");
const messageText = document.getElementById("message-text");

const phishBtn = document.getElementById("phish-btn");
const safeBtn = document.getElementById("safe-btn");
const nextBtn = document.getElementById("next-btn");

const feedback = document.getElementById("feedback");
const feedbackTitle = document.getElementById("feedback-title");
const feedbackText = document.getElementById("feedback-text");

const scoreDisplay = document.getElementById("score");

const questionNumber = document.getElementById("question-number");
const progressPercent = document.getElementById("progress-percent");
const progressFill = document.getElementById("progress-fill");
const progressDots = document.getElementById("progress-dots");
const progressBar = document.getElementById("progress-bar");

const finalScore = document.getElementById("final-score");
const resultName = document.getElementById("result-name");
const resultMessage = document.getElementById("result-message");
const resultDetail = document.getElementById("result-detail");
const resultFill = document.getElementById("result-fill");

const playAgainBtn = document.getElementById("play-again");
const shareResultBtn = document.getElementById("share-result");

const leaderboard = document.getElementById("leaderboard");

// 4. START GAME

startBtn.addEventListener("click", startGame);

playerNameInput.addEventListener("keydown", function(event) {

  if (event.key === "Enter") {
    startGame();
  }

});

function startGame() {

  playerName = playerNameInput.value.trim();

  if (playerName === "") {

    playerNameInput.setCustomValidity(
      "Please enter a nickname."
    );

    playerNameInput.reportValidity();

    return;

  }

  playerNameInput.setCustomValidity("");

  current = 0;
  score = 0;

  scoreDisplay.textContent = score;

  welcomeScreen.hidden = true;
  resultsScreen.hidden = true;
  quizScreen.hidden = false;

  renderProgressDots();

  showQuestion();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}

// 5. DISPLAY QUESTIONS

function showQuestion() {

  const q = questions[current];

  messageType.textContent = q.type;

  scenarioTitle.textContent = q.title;

  sender.textContent = q.from;

  messageText.textContent = q.text;

  questionNumber.textContent =
    "QUESTION " + (current + 1) + " OF " + questions.length;

  const progress =
    ((current + 1) / questions.length) * 100;

  progressPercent.textContent =
    Math.round(progress) + "%";

  progressFill.style.width = progress + "%";

  progressBar.setAttribute(
    "aria-valuenow",
    Math.round(progress)
  );

  feedback.hidden = true;

  feedback.className = "feedback";

  nextBtn.hidden = true;

  nextBtn.textContent = "NEXT QUESTION →";

  phishBtn.disabled = false;

  safeBtn.disabled = false;

  updateProgressDots();

}

// 6. CREATE PROGRESS DOTS

function renderProgressDots() {

  progressDots.innerHTML = "";

  questions.forEach(function(question, index) {

    const dot = document.createElement("span");

    dot.className = "progress-dot";

    dot.setAttribute(
      "aria-label",
      "Question " + (index + 1)
    );

    progressDots.appendChild(dot);

  });

}

// 7. UPDATE PROGRESS DOTS

function updateProgressDots() {

  const dots =
    progressDots.querySelectorAll(".progress-dot");

  dots.forEach(function(dot, index) {

    dot.classList.remove("active", "completed");

    if (index < current) {

      dot.classList.add("completed");

    }

    if (index === current) {

      dot.classList.add("active");

    }

  });

}

// 8. CHECK PLAYER ANSWER

phishBtn.addEventListener("click", function() {

  checkAnswer(true);

});

safeBtn.addEventListener("click", function() {

  checkAnswer(false);

});

function checkAnswer(userAnswer) {

  const q = questions[current];

  const isCorrect = userAnswer === q.isPhishing;

  // Prevent answering the same question twice.

  phishBtn.disabled = true;

  safeBtn.disabled = true;

  feedback.hidden = false;

  if (isCorrect) {

    score++;

    scoreDisplay.textContent = score;

    feedback.className = "feedback correct";

    feedbackTitle.textContent = "🎉 Correct! Great job!";

    launchConfetti();

  } else {

    feedback.className = "feedback incorrect";

    feedbackTitle.textContent = "💡 Not quite!";

  }

  feedbackText.textContent = q.explanation;

  nextBtn.hidden = false;

  if (current === questions.length - 1) {

    nextBtn.textContent = "SEE MY RESULTS 🏆";

  } else {

    nextBtn.textContent = "NEXT QUESTION →";

  }

}

// 9. NEXT QUESTION

nextBtn.addEventListener("click", function() {

  if (current < questions.length - 1) {

    current++;

    showQuestion();

  } else {

    showResults();

  }

});

// 10. DISPLAY FINAL RESULTS

function showResults() {

  quizScreen.hidden = true;

  resultsScreen.hidden = false;

  finalScore.textContent = score;

  resultName.textContent = playerName.toUpperCase();

  const percentage =
    (score / questions.length) * 100;

  resultFill.style.width = percentage + "%";

  if (score === 10) {

    resultMessage.textContent =
      "🏆 PHISHING DETECTOR MASTER!";

    resultDetail.textContent =
      "Perfect score! Your cybersecurity instincts are on fire. You spotted every threat!";

  } else if (score >= 7) {

    resultMessage.textContent =
      "🔥 CYBER SMART CHAMPION!";

    resultDetail.textContent =
      "Excellent work! You understand most phishing warning signs. Keep sharpening your skills.";

  } else if (score >= 5) {

    resultMessage.textContent =
      "💜 GETTING THERE!";

    resultDetail.textContent =
      "Good effort! You're learning to identify suspicious messages. Keep practising.";

  } else {

    resultMessage.textContent =
      "🛡️ YOUR CYBER JOURNEY STARTS HERE!";

    resultDetail.textContent =
      "Don't give up! Review the warning signs and try again. Every challenge is a learning opportunity.";

  }

  saveScore();

  renderLeaderboard();

  launchConfetti();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}

// 11. LEADERBOARD

function getLeaderboard() {

  try {

    return JSON.parse(
      localStorage.getItem("duchessLeaderboard")
    ) || [];

  } catch (error) {

    console.error(
      "Could not read leaderboard:",
      error
    );

    return [];

  }

}

function saveScore() {

  const scores = getLeaderboard();

  scores.push({

    name: playerName,

    score: score,

    date: new Date().toLocaleDateString()

  });

  scores.sort(function(a, b) {

    return b.score - a.score;

  });

  const topScores = scores.slice(0, 10);

  try {

    localStorage.setItem(
      "duchessLeaderboard",
      JSON.stringify(topScores)
    );

  } catch (error) {

    console.error(
      "Could not save leaderboard:",
      error
    );

  }

}

function renderLeaderboard() {

  const scores = getLeaderboard();

  leaderboard.innerHTML = "";

  if (scores.length === 0) {

    leaderboard.textContent =
      "No champions yet. Be the first!";

    return;

  }

  scores.forEach(function(player, index) {

    const row = document.createElement("div");

    row.className = "leaderboard-row";

    const position = document.createElement("span");

    position.className = "player-position";

    const name = document.createElement("span");

    name.className = "player-name";

    const points = document.createElement("span");

    points.className = "player-score";

    position.textContent = "#" + (index + 1);

    name.textContent = player.name;

    points.textContent = player.score + "/10";

    row.append(position, name, points);

    leaderboard.appendChild(row);

  });

}

// 12. PLAY AGAIN

playAgainBtn.addEventListener("click", function() {

  resultsScreen.hidden = true;

  welcomeScreen.hidden = false;

  playerNameInput.value = playerName;

  playerNameInput.focus();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});

// 13. SHARE RESULT

shareResultBtn.addEventListener("click", async function() {

const quizLink = "https://gracequaye1.github.io/phishing-quiz/";

  const shareText =
    "I scored " + score + "/10 in Spot the Phish by Duchess Tech Space! 👑\n\n" +
    "Think you can spot more scams than me? Take the challenge and beat my score 👉 " + quizLink;
  if (navigator.share) {

    try {

      await navigator.share({

        title: "Spot the Phish",

        text: shareText

      });

    } catch (error) {

      console.log("Sharing cancelled or unavailable.");

    }

  } else if (navigator.clipboard) {

    try {

      await navigator.clipboard.writeText(shareText);

      shareResultBtn.textContent = "COPIED! ✓";

    } catch (error) {

      alert(shareText);

    }

  } else {

    alert(shareText);

  }

});

// 14. CONFETTI ANIMATION

const canvas =
  document.getElementById("confetti-canvas");

const ctx = canvas.getContext("2d");

let confettiParticles = [];

let animationRunning = false;

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const confettiColors = [
  "#b7ff65",
  "#ff4fa3",
  "#8b35d1",
  "#ffffff",
  "#ffd166"
];

function resizeCanvas() {

  const pixelRatio =
    window.devicePixelRatio || 1;

  canvas.width =
    window.innerWidth * pixelRatio;

  canvas.height =
    window.innerHeight * pixelRatio;

  ctx.setTransform(
    pixelRatio,
    0,
    0,
    pixelRatio,
    0,
    0
  );

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

function launchConfetti() {

  if (reducedMotion) {
    return;
  }

  for (let i = 0; i < 110; i++) {

    confettiParticles.push({

      x: Math.random() * window.innerWidth,

      y: -20 - Math.random() * 100,

      size: Math.random() * 8 + 4,

      speedY: Math.random() * 4 + 2,

      speedX: Math.random() * 4 - 2,

      rotation: Math.random() * 360,

      rotationSpeed: Math.random() * 8 - 4,

      color: confettiColors[
        Math.floor(Math.random() * confettiColors.length)
      ]

    });

  }

  if (!animationRunning) {

    animationRunning = true;

    requestAnimationFrame(animateConfetti);

  }

}

function animateConfetti() {

  ctx.clearRect(
    0,
    0,
    window.innerWidth,
    window.innerHeight
  );

  confettiParticles.forEach(function(particle) {

    particle.x += particle.speedX;

    particle.y += particle.speedY;

    particle.rotation += particle.rotationSpeed;

    ctx.save();

    ctx.translate(
      particle.x,
      particle.y
    );

    ctx.rotate(
      particle.rotation * Math.PI / 180
    );

    ctx.fillStyle = particle.color;

    ctx.fillRect(
      -particle.size / 2,
      -particle.size / 2,
      particle.size,
      particle.size
    );

    ctx.restore();

  });

  confettiParticles = confettiParticles.filter(
    function(particle) {

      return particle.y < window.innerHeight + 30;

    }
  );

  if (confettiParticles.length > 0) {

    requestAnimationFrame(animateConfetti);

  } else {

    animationRunning = false;

    ctx.clearRect(
      0,
      0,
      window.innerWidth,
      window.innerHeight
    );

  }

}

// ============================================
// DUCHESS MOTIVATIONAL QUOTES
// ============================================

const motivationalQuotes = [
  "Your curiosity is your greatest tool. Never stop learning.",

  "Think like a defender. Stay one step ahead.",

  "Every expert was once a beginner.",

  "The future belongs to those who keep learning.",

  "Be curious. Be bold. Build something meaningful.",

  "Don't just use technology. Understand it.",

  "Your next breakthrough begins with one small step.",

  "Stay curious. Stay creative. Stay cyber smart.",

  "The strongest digital defence begins with awareness.",

  "You don't have to know everything. Just keep growing."
];

const quoteDisplay = document.getElementById(
  "motivational-quote"
);

let previousQuote = -1;

function changeQuote() {

  let randomIndex;

  do {
    randomIndex = Math.floor(
      Math.random() * motivationalQuotes.length
    );
  } while (
    randomIndex === previousQuote &&
    motivationalQuotes.length > 1
  );

  previousQuote = randomIndex;

  quoteDisplay.style.opacity = "0";

  setTimeout(function() {

    quoteDisplay.textContent =
      motivationalQuotes[randomIndex];

    quoteDisplay.style.opacity = "1";

  }, 400);

}

// Display a random quote when the website opens.

changeQuote();

// Change the quote every 10 seconds.

setInterval(changeQuote, 10000);


// 15. LOAD LEADERBOARD WHEN PAGE OPENS

renderLeaderboard();
