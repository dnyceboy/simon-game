
// array of button colors
let buttonColors = ["red", "blue", "green", "yellow"];

// empty array for game pattern
let gamePattern = [];

// empty array for user pattern
let userClickedPattern = [];

// game started variable
let gameStarted = false;

// game level
let level = 0;

// pattern sequence function
function nextSequence(){
    // increment level
    level++;

    // level display incremented
    $("#level-title").text("Level" + " " + level);

    // random number generator
    let randomNumber = Math.floor(Math.random() * buttonColors.length);
    // random button color generator
    let randomChosenColor = buttonColors[randomNumber];

    // push random button color into array
    gamePattern.push(randomChosenColor);

    // store id + color in variable
    let selectButton = $("#" + randomChosenColor);

    // button animation
    let buttonAnimate = selectButton.fadeOut(200).fadeIn(200);
    
    playSound(randomChosenColor);
};

// event listener for button clicks
$(".btn").click(event => {
    // store event target id
    let userChosenColor = event.target.id;

    // push user chosen color to array
    userClickedPattern.push(userChosenColor);
    
    let chosenAnswer = userClickedPattern.length - 1;
    
    console.log(chosenAnswer);
    checkAnswer(chosenAnswer);

    playSound(userChosenColor);

    animatePress(event.target.id);
});

// event listener for keypress
$("body").keydown(event => {
    
    if(gameStarted === false){
        gameStarted = true;
        $("#level-title").text("Level 0");
        nextSequence();
        // console.log(gameStarted);
    } else {
        // console.log("Game has started");
    }

});

// function to play sound when button clicked
function playSound(name){
    // play audio based on random color
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
};

// function for checking answer
function checkAnswer(currentLevel){

    console.log(userClickedPattern, gamePattern);
    console.log(userClickedPattern.toString() === gamePattern.toString());

    
        if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
            if (userClickedPattern.length === gamePattern.length){
                console.log("success");
                setTimeout(() => {
                    nextSequence();
                    userClickedPattern = [];
                }, 1000);
            }
            } else {
                console.log("wrong");
                let audioWrong = new Audio("sounds/wrong.mp3");
                audioWrong.play()
        
                $("body").toggleClass("game-over");
        
                setTimeout(() => {
                    $("body").toggleClass("game-over");
                }, 200);
        
                $("#level-title").text("GAME OVER, Press Any Key To Restart!");
        
                startOver();
            }

};

// Restart game
function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameStarted = false;
};