// alert("triggered");
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  console.log(currentColour);
  $(".btn" + "#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $(".btn" + "#" + currentColour).removeClass("pressed");
  }, 100);
}

$(".btn").on("click", function(event) {
  // console.log(event);
  // console.log(this);
  var userChosenColour = $(this).attr("id"); //using this to find the button object that triggered
  console.log(userChosenColour);
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  // console.log(level);
  $("#level-title").html("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  // console.log(gamePattern);
  playSound(randomChosenColour);
}

$("body").on("keydown", function() {
  if (started === false) {
    $("#level-title").html("Level " + level);
    nextSequence();
    started = true;
  }
  // $("h1").html("Level"+level);
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    var audio =new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over");},200);
    $("#level-title").html("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
 level=0;
 gamePattern=[];
 started=false;
}
