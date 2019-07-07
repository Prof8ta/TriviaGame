var quesIndex;
var gameTimer;
var timeAllotted = 60; 

var questionBank = [
    {
        question: "Which automaker is #1 according to sales?",
        answers: [
            { ansID: 1000, answer: "Hyundai" },
            { ansID: 1001, answer: "General Motors" },
            { ansID: 1002, answer: "Toyota" },
            { ansID: 1003, answer: "Volkswagen Group" },
        ],
        correct: 1002,
        selected: null,
        reason: "It's Toyota, with more than 10 million cars sold around the world."
    },
    {
        question: "Who owns the most car brands?",
        answers: [
            { ansID: 1003, answer: "Toyota" },
            { ansID: 1004, answer: "General Motors" },
            { ansID: 1005, answer: "Ford" },
            { ansID: 1006, answer: "Volkswagen Group" },
        ],
        correct: 1006,
        selected: null,
        reason: 'Volkswagen "GROUP" owns 12 makes including Bugatti, Lamborghini, and Porsche.'
    },
    {
        question: "In all Jaguars and Land Rovers today, you will see FoMoCo written on the car parts. What does this acronym stand for?",
        answers: [
            { ansID: 1007, answer: "Foundation Motor Companies" },
            { ansID: 1008, answer: "Ford Motor Company" },
            { ansID: 1009, answer: "Foundry Moto Corps." },
            { ansID: 1010, answer: "Foster Morese Corporation" },
        ],
        correct: 1008,
        selected: null,
        reason: "FoMoCo does stand for Ford Motor Company... so YES Land Rover(in 2000) and Jaguar(in 1989) were owned and made by Ford til 2008, sad."
    },
    {
        question: "In 1999 what 3 major Automakers united to create a 3 headed alliance?",
        answers: [
            { ansID: 1011, answer: "Volvo, Daihatsu, Daewoo" },
            { ansID: 1012, answer: "Ford, General Motors, Chrysler" },
            { ansID: 1012, answer: "Subaru, Toyota, Ford" },
            { ansID: 1013, answer: "Renault, Nissan, Mitsubishi" },
        ],
        correct: 1013,
        selected: null,
        reason: "Known as the Renault-Nissan-Mitsubishi Alliance, this union in partenship saved the companies. No, 1, company totally bought out the other!"
    },
    {
        question: "What Automaker owned Chrysler and let them fall like a ton of bricks to their almost bankrupt demise in 2009?",
        answers: [
            { ansID: 1014, answer: "Fiat" },
            { ansID: 1015, answer: "Daimler AG" },
            { ansID: 1016, answer: "Honda Motor Co." },
            { ansID: 1017, answer: "BMW Group" },
        ],
        correct: 1015,
        selected: null,
        reason: "In 2009 Daimler AG, who is basically Mercedez, dropped Chrysler as dead weight into bankruptcy. Fiat came like Superman and saved the company by acquiring all it's assets."
    },
];

function populateQuestionDetails() {
    $("#answer-response").hide();

    $("#question-container").empty();
    $("#answers-container").empty();
    $("#answer-response").empty();

    $("#question-container").html(questionBank[quesIndex].question);

    var quesAnswers = questionBank[quesIndex].answers;

    for (var i = 0; i < quesAnswers.length; i++) {
        $("#answers-container").append('<div class="answer" data-content="' + quesAnswers[i].ansID + '">' + quesAnswers[i].answer + '</div>');
    }

    renderQuesControls();
}

function renderQuesControls() {
    if (quesIndex === 0) {
        $("#previousQ").hide();
        $("#nextQ").show();
    } else if (quesIndex === questionBank.length - 1) {
        $("#previousQ").show();
        $("#nextQ").hide();
        $("#finish").show();
    } else {
        $("#previousQ").show();
        $("#nextQ").show();
    }
   
}

function getPreviousQuestion() {
    quesIndex--;
    populateQuestionDetails();
}

function getNextQuestion() {
    quesIndex++;
    populateQuestionDetails();
}

function processAnswer() {
    var selectedAnsID = parseInt($(this).attr("data-content"));
    var correctAnsID = questionBank[quesIndex].correct;

    if (selectedAnsID === correctAnsID) {
        $("#answer-response").html("<h4>Correct!</h4>");
    } else {
        $("#answer-response").html("<h4>Sorry that's not right.</h4>");
    }

    $("#answer-response").append(questionBank[quesIndex].reason);
    $("#answer-response").show();

   
    questionBank[quesIndex].selected = selectedAnsID;

    console.log(questionBank[quesIndex].selected);
}

$(document).ready(function () {
    
    $("#main-game").hide();
    $("#results-display").hide();
    $("#previousQ").hide();
    $("#nextQ").hide();
    $("#finish").hide();
});

function updateClock() {
    timeAllotted--;
    $("#game-timer").html(timeAllotted);
    if (timeAllotted === 0) {
        clearInterval(gameTimer);
        endGame();
    }
}

$("#start").on("click", function () {
    $("#splash-screen").hide();
    $("#main-game").show();

    gameTimer = setInterval(updateClock, 1000);

    quesIndex = 0;
    populateQuestionDetails(quesIndex);
});


$(document).on("click", ".answer", processAnswer);

$("#previousQ").on("click", getPreviousQuestion);

$("#nextQ").on("click", getNextQuestion);

$("#finish").on("click", endGame);

function endGame() {
    $("#main-game").hide();
    processResults();
    $("#results-display").show();
}

$("#restart").on("click", function () {
    console.log("reload the game.");
    window.location.reload()
});

function processResults() {
    var status;
    var correct = 0;
    var incorrect = 0;
    var score = 0;

    for (var i = 0; i < questionBank.length; i++) {
        if (questionBank[i].correct === questionBank[i].selected) {
            correct++;
            status = "Correct!";
        } else {
            incorrect++;
            status = "Incorrect!";
        }

        

        if (questionBank[i].selected !== null) {
            
            var selectedText = "NA";
            for (var j = 0; j < questionBank[i].answers.length; j++) {
                if (questionBank[i].answers[j].ansID === questionBank[i].selected) {
                    selectedText = questionBank[i].answers[j].answer;
                    break;
                }
            }
        } else {
            selectedText = "--";
        }
        
        var correctText = "NA";
        for (var k = 0; k < questionBank[i].answers.length; k++) {
            if (questionBank[i].answers[k].ansID === questionBank[i].correct) {
                correctText = questionBank[i].answers[k].answer;
                break;
            }
        }

        $("#result-rows").append("<tr><td>" + questionBank[i].question + "</td><td>" + selectedText + "</td><td>" + correctText + "</td><td>" + status + "</td></tr>");
    }


}