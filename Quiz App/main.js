// Array to store quiz questions and their respective answers
const questions = [ // Iska naam 'questions' kar diya
    {
        question: "What keyboard is used to declare a variable in JavaScript?",
        answers: [
            {text: "int", correct: false},
            {text: "var", correct: true},
            {text: "dim", correct: false},
            {text: "static", correct: false},
        ]
    },
    
    {
        question: "What does KPI stand for?",
        answers: [
            {text: "Key Process Indicator", correct: false},
            {text: "Key Project Index", correct: false},
            {text: "Key Performance Indicator", correct: true},
            {text: "Key Project Insight", correct: false},
        ]
    },

    {
        question: "Which symbol is used for addition in C?",
        answers: [
            {text: "+", correct: true},
            {text: "*", correct: false},
            {text: "%", correct: false},
            {text: "/", correct: false},
        ]
    },

    {
        question: "Which keyword is used to declare an integer variable?",
        answers: [
            {text: "double", correct: false},
            {text: "char", correct: false},
            {text: "int", correct: true},
            {text: "float", correct: false},
        ]
    },

    {
        question: "print(6 / 3)",
        answers: [
            {text: "2.0", correct: false},
            {text: "3", correct: false},
            {text: "2", correct: true},
            {text: "Error", correct: false},
        ]
    },

    {
        question: "print(1 == 1)",
        answers: [
            {text: "1", correct: false},
            {text: "False", correct: false},
            {text: "Error", correct: false},
            {text: "True", correct: true},
        ]
    },

    {
        question: "print(3 == 3)",
        answers: [
            {text: "True", correct: true},
            {text: "False", correct: false},
            {text: "None", correct: false},
            {text: "Error", correct: false},
        ]
    },

    {
        question: "What is the output of print(2 + 2)?",
        answers: [
            {text: "2+2", correct: false},
            {text: "22", correct: false},
            {text: "4", correct: true},
            {text: "Error", correct: false},
        ]
    },

        {
        question: "What is the output of print(2 + 2)?",
        answers: [
            {text: "func", correct: false},
            {text: "def", correct: true},
            {text: "function", correct: false},
            {text: "define", correct: false},
        ]
    },

        {
        question: "Which keyword is used to create a loop?",
        answers: [
            {text: "loop", correct: false},
            {text: "repeat", correct: false},
            {text: "do", correct: false},
            {text: "while", correct: true},
        ]
    },

    // ... baaki questions bhi yahan raheinge
];

// DOM Elements Selection
const questionElement = document.querySelector(".question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.querySelector(".next-btn");
const timerElement = document.getElementById("timer");

// Quiz State Variables
let currentQuestionIndex = 0; // Tracks the current question index
let score = 0; // Tracks the user's score
let timer; // Variable to store the interval ID for the timer
let timeLeft = 15; // Time allocated for each question in seconds

// Function to initialize and start the quiz
function startQuiz() {
    currentQuestionIndex = 0; // Reset index to the first question
    score = 0; // Reset score to 0
    nextButton.innerHTML = 'Next <i class="fa-solid fa-angle-right"></i>'; // Set button text
    timerElement.style.display = "flex"; // Show timer element
    showQuestion(); // Display the first question
}

// Function to display the current question and its answers
function showQuestion() {
    resetState(); // Clear previous question's answers and state
    startTimer(); // Start countdown timer for the new question
    
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1; // Question number for display
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question; // Set question text

    // Create a button for each answer option
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn"); // Add CSS class for styling
        answerButton.appendChild(button); // Add button to the DOM

        // If the answer is correct, store this data in the button
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        // Add click event listener to check answer when clicked
        button.addEventListener("click", selectAnswer);
    });
}

// Function to reset the state before displaying a new question
function resetState() {
    clearInterval(timer); // Stop the timer of the previous question
    nextButton.style.display = "none"; // Jab tak answer select na ho Next button chhupa rahega (Hide Next button initially)
    
    // Remove all previous answer buttons
    while(answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

// Function triggered when an answer button is clicked
function selectAnswer(e) {
    clearInterval(timer); // Stop the timer since answer is selected
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true"; // Check if answer is correct

    // Apply appropriate class based on whether answer is correct or not
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++; // Increase score if correct
    } else {
        selectedBtn.classList.add("incorrect");
    }

    // Ek baar click karne ke baad sahi answer ko highlight karna aur buttons disable karna
    // Highlights the correct answer and disables all buttons to prevent multiple clicks
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct"); // Highlight the correct answer
        }
        button.disabled = true; // Disable button interaction
    });
    nextButton.style.display = "block"; // Answer dene ke baad Next button dikhao (Show Next button to proceed)
}

// Function to display the final score at the end of the quiz
function showScore() {
    resetState(); // Clear the screen
    timerElement.style.display = "none"; // Hide timer
    // Display result message
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again"; // Change button text to replay
    nextButton.style.display = "block"; // Show the play again button
}

// Function to handle moving to the next question or ending the quiz
function handleNextButton() {
    currentQuestionIndex++; // Move to the next question
    if(currentQuestionIndex < questions.length) {
        showQuestion(); // If questions remain, show the next one
    } else {
        showScore(); // Otherwise, show the final score
    }
}

// Event listener for the Next / Play Again button
nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length) {
        handleNextButton(); // Go to next question
    } else {
        startQuiz(); // Restart the quiz
    }
});

// Function to handle the countdown timer
function startTimer() {
    timeLeft = 15; // Reset time to 15 seconds
    const totalTime = 15;
    const timerTextElement = document.getElementById("timer-text");
    
    // Function to visually update the timer (text and circular progress)
    function updateUI() {
        if(timerTextElement) timerTextElement.innerHTML = `${timeLeft}s`;
        // Calculate degree for conic-gradient to create a decreasing circular progress effect
        let deg = (timeLeft / totalTime) * 360;
        timerElement.style.background = `conic-gradient(#d90429 ${deg}deg, #e4e4e4 0deg)`;
    }

    updateUI(); // Initial UI update

    // Decrease time every 1 second (1000ms)
    timer = setInterval(() => {
        timeLeft--;
        updateUI(); // Update UI with new time
        
        // When time runs out
        if (timeLeft <= 0) {
            clearInterval(timer); // Stop the timer
            handleTimeOut(); // Handle the timeout state
        }
    }, 1000);
}

// Function to handle what happens when the timer runs out
function handleTimeOut() {
    // Reveal the correct answer and disable all buttons
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block"; // Show Next button to allow proceeding
}

// Start the quiz automatically when the script loads
startQuiz();