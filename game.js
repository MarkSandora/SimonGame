var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// Detect when a key has been pressed, call nextSequence().
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);
  // Animate a flash to the button
  animatePress(userChosenColour);
  // Play the sound for the button colour selected
  playSound(userChosenColour);
  // Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel) {
  // Check if the most recent user answer is the same as the game pattern. 
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success: " + userClickedPattern);
      // If the user got the most recent answer right, then check that they have finished their sequence.
      if (userClickedPattern.length === gamePattern.length){
        // Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    // Call startOver() if the user gets the sequence wrong.
    startOver();
  }
}

function nextSequence() {
  // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];
  // increase the level by 1 every time nextSequence() is called.
  level++;
  $("#level-title").text("Level " + level);

  // Generate random nunmber from 0 -3
  var randomNumber = Math.floor(Math.random() * 4);
  // Choose random from buttonColours array
  var randomChosenColour = buttonColours[randomNumber];
  // Push random color to new array
  gamePattern.push(randomChosenColour);
  // Animate a flash to the button
  animatePress(randomChosenColour);
  // Play the sound for the button colour selected
  playSound(randomChosenColour);
}

function playSound(name){
  // Play the sound for the button colour selected
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  // Animate a flash to the button
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}