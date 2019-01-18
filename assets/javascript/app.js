//set timer to 100 seconds. Each questions has 10 seconds averaged.
    var number = 100;

//  Variable that will hold our interval ID when doing "run" function
    var intervalId;

    function run() {
      clearInterval(intervalId);
      intervalId = setInterval(decrement, 1000);
    }

    //  The decrement function.
    function decrement() {

      //  Decrease number by one.
      number--;

      //  Show the number in the #show-number tag.
      $(".shownumber").html("<h2>" + number + "</h2>");


      //  Once number hits zero...
      if (number === 0) {

        //  ...run the stop function.
        stop();

        //  Alert the user that time is up.
        alert("Time Up!");

        //
        restartQuiz();

      }
    }

    //  The stop function
    function stop() {

      //  Clears our intervalId
      //  We just pass the name of the interval
      //  to the clearInterval function.
      clearInterval(intervalId);
    }

    //  Execute the run function.
    run();

//start with global variables. currentQuestion will be 0, tracks the index in the questionss.
//questions will be array of objects. Each object has a title, answers, correct 
//(tells index whoch one is the right choice in array.)

let score = 0;
let currentQuestion = 0;
let questions = [
    {
    title: "How does Detective Cooper drink his coffee?",
    answers: ['two creamers','one splenda','black','decaf'],
    correct: 2 //black
},
{
    title: "Who has a motorcycle?",
    answers: ['James','Laura','Dean','Leeland'],
    correct: 0 //James
},
{
    title: "What famous mind created Twin peaks",
    answers: ['Wes Anderson','Steven Spielberg','David Lynch','Quentin Tarantino'],
    correct: 2 //David Lynch
},
{
    title: "What is agent Cooper's real name?",
    answers: ['David','Lee','Kyle','Dale'],
    correct: 3 //Dale
},
{
    title: "Who was Laura's best friend?",
    answers: ['Donna','Audrey','James','her mother'],
    correct: 0 //Donna
},
{
    title: "How was Nadine related to James?",
    answers: ['his sister','his cousin','his friend','his aunt'],
    correct: 3 //aunt
},
{
    title: "Who found Laura by the lake?",
    answers: ['Detective Cooper','Deputy Hawk','The Sheriff','Pete Martell'],
    correct: 3 //Pete Martell
},
{
    title: "What hotel was owned by Ben Horne?",
    answers: ['The Great Northern','Two Trees','Black Owl','Forest Times'],
    correct: 0 //The Great Northern
},
{
    title: "How many seasons did Twin Peaks last for",
    answers: ['one','eight','seven','three'],
    correct: 3 //three
},
{
    title: "What state does Twin Peaks take place in?",
    answers: ['Oregon','Washington','Arizona','Montana'],
    correct: 1 //Washington
},
];

// Display initial time countdown
$("#time").html("<h2>Time Remaining: 30 Seconds</h2>" + "<br>");

// Start timer countdown
run();


//variables set up. Add in eventlisteners now. Think about the 
//functionality. Need to start quiz, need to show question, 
//need to check answer, need to show summary
//opening quiz, select anchor tag to begin the quiz
$(document).ready(function(){
    $('.start a').click(function(e){
    e.preventDefault();
    $('.start').hide();
    $('.quiz').show();
    showQuestion();
    });

    //add event listener. I want to toggle the choices selected, whether it is
    //highlighting or creating a radio button, etc. Style these more in css
    $('.quiz ul').on('click','li',function(){
    $('.selected').removeClass('selected');
    $(this).addClass('selected');
    });

    //which answer they click before
    //submitting click answer use selsected class
    $('.quiz a').click(function(e){
    e.preventDefault(); 
    if($('li.selected').length){
    let guess = parseInt($('li.selected').attr('id'));
    checkAnswer(guess);
    } else {
        alert('Please select an answer to continue');
    }
    });

    $('.summary a').click(function(e){
    e.preventDefault();
    restartQuiz();
    });

});

//display a question. Use array of questions and use index to keep track of what number
//question you are on
function showQuestion(){
    let question = questions[currentQuestion]; //start with first question
    $('.quiz h2').text(question.title); //brings in the title for each question
    $('.quiz ul').html(''); //clear out dummy questions, left over after each ?
    
    //create simple for loop. Each of these need the targeteted quiz ul, append an li
    //li with id of 'i' meaning it will represent the answer
    for(var i=0; i<question.answers.length; i++){
        $('.quiz ul').append("<li id='"+i+"'>"+question.answers[i]+"</li>");
    }
}

function checkAnswer(guess){
    let question = questions[currentQuestion];
    if(question.correct === guess) {
        score++;
    }
    currentQuestion++;
    if(currentQuestion >= questions.length) {
    showSummary();
    } else {
        showQuestion();
    }
    }

function showSummary(){
    $('.quiz').hide();
    $('.summary').show();
    $('.summary p').text("Congrats you scored "+score+" out of "+questions.length+" correct!")
}

function restartQuiz (){
    $('.summary').hide();
    $('.quiz').show();
    score = 0;
    currentQuestion = 0;
    showQuestion();
}




