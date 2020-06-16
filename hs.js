//High Score variables
var highScores = document.querySelector("#highScores");
var listOfScores = document.querySelector("#listOfScores");
var backBtn = document.querySelector("#backBtn");
var clearBtn = document.querySelector("#clearBtn");

backBtn.addEventListener("click", function() {
    window.location.replace("index.html");
});

clearBtn.addEventListener("click", function() {
    localStorage.clear();
    window.location.reload();
});

var scoresList = localStorage.getItem("scoresList");

scoresList = JSON.parse(scoresList);

for (var i = 0; i <scoresList.length; i++) {
    var newScore = document.createElement("li");
    newScore.textContent = scoresList[i].initials + ": " + scoresList[i].score;
    listOfScores.appendChild(newScore);
}