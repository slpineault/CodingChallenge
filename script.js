// variables to use in quiz
var currentQuestion = 0;
// this is our starting point for the clock
var time = 20;
var timeId;

// variable for Dom
var questionEl = document.getElementById('questions');
var timerEl = document.getElementById('time');
var choiceEl = document.getElementById('choices');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start');
var initials = document.getElementById('initials');

function start() {
    // hide the start container
    var startScreen = document.getElementById('start');
    startScreen.setAttribute('class', 'hide');

    //  show the question container
    questionEl.removeAttribute('class');

    timeId = setInterval(clock, 1000)

    timerEl.textContent = time;

    getQuestions();

}

function clock() {
    // update time count down
    time--;
    timerEl.textContent = time
    // if time runs out game is over
    if (time <= 0) {
        gameOver()
    }
}

function getQuestions() {
    // get the questions from questions.js 
    var newQuestion = questions[currentQuestion];

    // update the title of the question
    var titleEl = document.getElementById('title');
    titleEl.textContent = newQuestion.title;

    // loop over the choices of the question
    newQuestion.choices.forEach(function (choice, selections) {
        // create a button for each choice
        var choiceOption = document.createElement("button");
        choiceOption.setAttribute('class', 'choice')
        choiceOption.setAttribute('value', choice);

        choiceOption.textContent = selections + 1 + ". " + choice;
        // dding click event to buttons
        choiceOption.onclick = answer;

        choiceEl.appendChild(choiceOption);
    })
}

function answer() {
    // check if the guess was wrong
    if (this.value !== questions[currentQuestion].answer) {
        //take time away
        time -= 2;

        if (time < 0) {
            time = 0
        }
        timerEl.textContent = time;
        alert('wrong');
    } else {
        alert('correct')
    }
    // move to the next question
    currentQuestion++;
    // check to see if there are more questions
    if (currentQuestion === questions.length) {
        gameOver()
        alert('game Over')
    } else {
        // getQuestions()
        alert('next game')
    }
}

function gameOver(){
    // stop time
    clearInterval(timeId);

    // display end screen
    var end = document.getElementById('end');
    end.removeAttribute('class');

    // show final score
    var finalScore = document.getElementById('final-score');
    finalScore.textContent = time

    // hide the question panel
    questionEl.setAttribute('class', 'hide');

}

//create saveHighScore fucntion to save the score and initials. And this needs to be saved in local storage

// create a function that listens to the enterkey to save the initials in the saveHighScore function

startBtn.onclick = start;