$(document).ready(function() {

    //start with global variables
    var totalQuiz = 6,
        answers = ["black", "davidLynch", "washington", "herFather", "donna", "3"],
        data = $("input"),
        correctAnswer = 0,
        incorrectAnswer = 0,
        blank = 0,
        count = 10;


    //create a loop to calculate the players answers and what is correct
    function scoreCount() {
        for (var i = 0; i < data.length; i++) {

            // when player checks answer
            if (data[i].checked) {

                // check if what player selected is equal to correct value in array

                if (answers.indexOf(data[i].value) !== -1) {
                    correctAnswer++;
                } else {
                    incorrectAnswer++;
                }
            }
        }
    
        // check how many questions the player answered in total from actual number 
        var totalAnswered = correctAnswer + incorrectAnswer;
        console.log(totalAnswered);
        if (totalAnswered !== totalQuiz) {
            blank = totalQuiz - totalAnswered;
        }

        $('#correct').html(" " + correctAnswer);
        $('#incorrect').html(" " + incorrectAnswer);
        $("#blank").html(" " + blank);

    } //ending count

    //when clicking play the quiz will pop open 
    $("#quiz, #results").hide();

    //quiz begins
    $("#play").click(function() {
        $("#start").hide("slow");
        $("#quiz").show("slow");

        //timer begins for player, will count down

        var startTimer = setInterval(function() {
            count--;
            $("#countdown").html(count);

            //if player does not finish the game alert their current score

            if (count === 0) {
                clearInterval(timer);
                $("#quiz, #timer").hide("slow");
                $("#results").show("slow");
                scoreCount();
            }
        }, 1000);

    });

    //when selecting done, will calculate the quiz score

    $("#done").click(function() {
        $("#quiz, #timer").hide("slow");
        $("#results").show("slow");
        clearInterval(timer);
        scoreCount();
    });

    //restart the quiz

    $("#restart").click(function() {
        location.reload();
    });
});
