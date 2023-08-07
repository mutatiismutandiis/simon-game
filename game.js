const buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let level = 0;
let gameStarted = false;

const WRONG = "wrong";
const GAME_OVER = "Game Over, Press Any Key to Restart";

// Event listener to start the game
$(document).on("keypress", function () {
  if (!gameStarted) {
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStarted = true;
  }
});

// Event listener to get the player sequence
$(".btn").click(function () {
  if (gameStarted) {
    const userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    // Flashing and sound effect
    addFlashEffect(userChosenColor);
    playSound(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
  }
});

// Game sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  const randomChosenColor = buttonColors[getRndInteger(0, 3)];
  gamePattern.push(randomChosenColor);

  // Flashing and sound effect
  addFlashEffect(randomChosenColor);
  playSound(randomChosenColor);
}

// Check player answer
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound(WRONG);
    $("#level-title").text(GAME_OVER);
    animateGameOver();
    startOver();
  }
}

// Helpers
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function playSound(name) {
  const audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function addFlashEffect(name) {
  $("#" + name)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
}

function animatePress(currentColor) {
  $(".btn").click(function () {
    $("#" + currentColor).addClass();
  });
}

function animateGameOver() {
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}
