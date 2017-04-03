var inquirer = require("inquirer"); //inquirer package
var incorrect = 0;
var correct = 0;
var currentQuestion = 0;
var clQuestions = [];
//array of questions
var questions = [
    {
        full: "The continent Antarctica has the fewest flowering plants",
        cloze: "Antarctica"
    },
    {
        full: "Thomas Edison averaged one patent for every three weeks of his life",
        cloze: "Thomas Edison"
    },
    {
        full: "A water moccasin often called cottonmouth because of the white inside its mouth",
        cloze: "cottonmouth"
    },
    {
        full: "Earth is the largest and densest of the four rocky planets",
        cloze: "Earth"
    },
    {
        full: "Samba originated in America",
        cloze: "America"
    },
    {
        full: "In basketball, the hawks are from Atlanta",
        cloze: "Atlanta"
    },
    {
        full: "Uranus was the first planet in our solar system to be discovered by telescope",
        cloze: "Uranus"
    },
    {
        full: "The Twilight Saga of movies is based on novels written by Stephenie Meyer",
        cloze: "Stephenie Meyer"
    },
    {
        full: "Nebraska is called the cornhusker state",
        cloze: "Nebraska"
    },
    {
        full: "In baseball, the Blue Jays come from Toronto",
        cloze: "Toronto"
    }
];

//constructor that takes in two parameters,
    //the front of the flash card
    //the back of the flash card
function BasicCard(front, back){
    if(this instanceof BasicCard){
        this.front = front;
        this.back = back;
    }else{
        return new BasicCard(front, back);
    }
}//END BASIC CARD CONSTRUCTOR WITH SAFE CONSTRUCTOR

//constructor that takes in two parameters
    //full text of question
    //cloze which replaces the answer with ____
function ClozeCard(text, cloze) {
    if(this instanceof ClozeCard) {
        this.text = text;
        this.cloze = cloze;
        this.partial = text.replace(cloze, "...");
    }else{
        return new ClozeCard(text, cloze);
    }
}//END CLOZE CARD CONSTRUCTOR WITH SAFE CONSTRUCTOR

//loops through questions array to get the text and partial answer and store them into a new empty array
for(var i = 0; i < questions.length; i++){
    var getCl = ClozeCard(questions[i].full, questions[i].cloze);
    clQuestions.push(getCl);
}//enf for loop

//start quiz
startQuiz();


//function with quiz logic
function startQuiz() {
    inquirer.prompt([
        {
            type: "input",
            message: clQuestions[currentQuestion].partial + "\nAnswer is: ",
            name: "user"
        }
    ]).then(function (answers) {
        if (answers.user.toLowerCase() === clQuestions[currentQuestion].cloze.toLowerCase()) {
            console.log("You are Right!");
            correct++; //keep track of correct guesses
        } else {
            console.log("You are wrong");
            incorrect++; //keep track of incorrect guesses
            //show correct answer
            console.log("The correct answer is: \n" + clQuestions[currentQuestion].text);
            console.log("------------------");
        }

        //go to next question
        if (currentQuestion < clQuestions.length - 1) {
            currentQuestion++; //go to next question if true
            startQuiz(); //run the function again
        } else {
            console.log("The Quiz is over!...Lets see how you did");
            console.log("Correct Guesses: " + correct);
            console.log("Incorrect Guesses: " + incorrect);

            //ask the user to play gain
            inquirer.prompt([
                {
                    type: 'confirm',
                    message: 'Would you like to play again?',
                    name: 'playAgain'
                }
            ]).then(function (answers) {
                if (answers.playAgain) {
                    // Reset the game
                    currentQuestion = 0;
                    correct = 0;
                    incorrect = 0;

                    //run the function
                    startQuiz();
                } else {
                    // Exit the game
                    console.log('Thanks for playing!');
                }//END ELSE
            });//END PROMPT INQUIRER
        }//END ELSE
    });//END OUTER INQUIRER
}//END FUNCTION

