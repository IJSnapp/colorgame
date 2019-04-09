var numSquares = 9;
var colors = [];
var pickedColor;
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var header = document.querySelector("h1");
var resetButton = document.getElementById("reset");
var modeButtons = document.getElementsByClassName("mode");
var squares = document.querySelectorAll(".square");

init();

function init(){
    setupModeButtons();
    setupSquares();
    reset();
}

function setupModeButtons() {
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            modeButtons[2].classList.remove("selected");
            this.classList.add("selected");
            if(this.textContent === "Easy"){
                numSquares = 3;
            } else if(this.textContent === "Medium"){
                numSquares = 6;
            } else{
                numSquares = 9;
            }
            reset();
        }); 
    }
}

function setupSquares(){
    for (var i = 0; i < squares.length; i++) {
        //click listeners for squares
        squares[i].addEventListener("click", function(){
            //grabs color of selection
            var clickedColor = this.style.backgroundColor
            //compare selection to pickedColor
            if(clickedColor === pickedColor){
                resetButton.textContent = "Play Again";
                changeColors(clickedColor);
                messageDisplay.textContent = "Correct";
                header.style.backgroundColor = clickedColor;
            } else{
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Guess again";
            }
        });    
    }
}

function changeColors(color) {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color; 
    }
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    var arr = []
    for (var i = 0; i < num; i++) {
       arr.push(randomColors());
    }
    return arr;
}

function randomColors() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);

    return "rgb(" + r + ", " + g + ", " + b + ")"
}

function reset(){
    //generate new colors
    colors = generateRandomColors(numSquares);
    //pick new answer
    pickedColor = pickColor();
    //change colorDisplay
    colorDisplay.textContent = pickedColor;
    //change new colors
     for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i]; 
        } else {
            squares[i].style.display = "none";
        }
    }
    resetButton.textContent = "New Colors";
    header.style.backgroundColor = "steelblue";
    messageDisplay.textContent = ""
}

resetButton.addEventListener("click", function(){
    reset();
});