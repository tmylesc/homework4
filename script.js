//Declaring variables
var timer = document.querySelector("#timer");
var startBtn = document.querySelector("#startQuiz");
var quizBox = document.querySelector("#quizBox");
var currentQuestion = document.querySelector("#currentQuestion");
var questionNum = document.querySelector("#questionNum");
var choiceList = document.querySelector("#choiceList");
var correctAnswer = document.querySelector("#correctAnswer");
var scoresBtn = document.querySelector("#scoresBtn");

var score = 0;
var questionIndex = 0;
var secondsLeft = 75;
var wrongAnswer = 10;
var ulCreate = document.createElement("ul");



//Array containing all the questions
var questionList = [
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["Strings", "Booleans", "Alerts", "Numbers"],
        answer: "Alerts"
    },
    {
        question: "The condition in an if/else statement is enclosed within _____.",
        choices: ["Quotes", "Curly brackets", "Parentheses", "Square brackets"],
        answer: "Parentheses"
    },
    {
        question: "Arrays in JavaScript can be used to store _____.",
        choices: ["Numbers and strings", "Other arrays", "Booleans", "All of the above"],
        answer: "All of the above"
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        choices: ["Commas", "Curly brackets", "Quotes", "Parentheses"],
        answer: "Quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "Terminal/bash", "For loops", "Console log"],
        answer: "Console log"
    },
];

//Clicking on button starts timer (75 sec)
startBtn.addEventListener("click", function() {
    //Runs countdown timer
    var countdownTimer = setInterval(function() {
        if (secondsLeft === 0) {
            clearInterval(countdownTimer);
            timer.textContent = "Time's up!";
        }
        else {
            timer.textContent = "Time: " + secondsLeft;
        }
        secondsLeft -= 1;
    }, 1000);

    startBtn.remove();

    //Loads questions
    loadQuestion(questionIndex);


});

//Loads questions to the screen
function loadQuestion(questionIndex) {
    ulCreate.innerHTML = "";
    for (var i = 0; i < questionList.length; i++) {
        var nextQuestion = questionList[questionIndex].question;
        var nextChoices = questionList[questionIndex].choices;
        // var currentNum = "Question " + questionIndex++;

        currentQuestion.textContent = nextQuestion;
        // questionNum.textContent = currentNum;
    }

    nextChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        choiceList.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (checkAnswer));
    })


}

//Checks if answer is correct
function checkAnswer(event) {
    var checked = event.target;

    if (checked.matches("li")) {
        if (checked.textContent == questionList[questionIndex].answer) {
            correctAnswer.textContent = "Correct! The answer is: " + questionList[questionIndex].answer;
        }
        else {
            secondsLeft = secondsLeft - wrongAnswer;
            correctAnswer.textContent = "Wrong! The correct answer is: " + questionList[questionIndex].answer;
        }
    }

    questionIndex++;

    //stop quiz after final question
    if (questionIndex >= questionList.length) {
        var finalScore = secondsLeft
        choiceList.textContent = "";
        correctAnswer.textContent = "";
        ulCreate.textContent = "";
        currentQuestion.textContent = "";
        questionNum.textContent = "Quiz is over! Your score is: " + finalScore;

        ///entering info to save score
        var initialsLabel = document.createElement("label");
        initialsLabel.textContent = "Enter intials: ";
        quizBox.appendChild(initialsLabel);

        var enterInitials = document.createElement("input");
        enterInitials.setAttribute("type", "text");
        enterInitials.textContent = "";
        quizBox.appendChild(enterInitials);

        var submitBtn = document.createElement("button");
        submitBtn.setAttribute("type", "submit");
        submitBtn.textContent = "Submit";
        quizBox.appendChild(submitBtn);

        //Saves score
        submitBtn.addEventListener("click", function() {
            var initials = enterInitials.value;

            var quizScore = {
                initials: initials,
                score: finalScore
            }

            var scoresList = localStorage.getItem("scoresList");
            if (scoresList === null) {
                scoresList = [];
            }

            else {
                scoresList = JSON.parse(scoresList);

            }

            scoresList.push(quizScore);

            scoresList = JSON.stringify(scoresList);

            localStorage.setItem("scoresList", scoresList);

            window.location.replace("high-scores.html");



        })

    }

    else {
        loadQuestion(questionIndex);
    }



}

scoresBtn.addEventListener("click", function () {
    window.location.replace("high-scores.html");
})