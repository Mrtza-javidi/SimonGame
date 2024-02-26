
let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

$(document).on("keypress", function() {

    if (!started) {
        nextSequence();
        $("#level-title").text("Level " + level);
        started = true;
    }
    
})

$(".btn").on("click", function() {

    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(this);
    checkAnswer(userClickedPattern.length - 1);

});


function nextSequence() {

    userClickedPattern = [];
    level ++;
    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

};

function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }

    } else {
        
        console.log("wrong");
        let audio = new Audio("./sounds/wrong.mp3");
        audio.play();
        
        $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();

    }
}


function startOver() {
    gamePattern = [];
    level = 0;
    started = false;
}


function playSound(name) {
    let audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
};



function animatePress(currentColour) {
    $(currentColour).addClass("pressed");
    setTimeout(function(){
    $(currentColour).removeClass("pressed");
    }, 100);
};


