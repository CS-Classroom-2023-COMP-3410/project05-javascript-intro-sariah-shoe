document.addEventListener("DOMContentLoaded", () => {
    const quizContainer = document.getElementById("quiz");
    const nextButton = document.getElementById("next-btn");
    const restartButton = document.getElementById("restart-btn");
    const resultContainer = document.getElementById("result");

    const questions = [
        {
            question: "What is the capital of Germany?",
            options: ["Berlin", "Munich", "Hamburg", "Cologne"],
            answer: "Berlin"
        },
        {
            question: "Which language is primarily spoken in Brazil?",
            options: ["Portuguese", "Spanish", "French", "German"],
            answer: "Portuguese"
        },
        {
            question: "What is 5 + 3?",
            options: ["5", "8", "12", "15"],
            answer: "8"
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let userAnswers = [];

    function loadQuestion() {
        const questionData = questions[currentQuestionIndex];
        quizContainer.innerHTML = `<h3>${questionData.question}</h3>`;

        questionData.options.forEach(option => {
            const button = document.createElement("button");
            button.classList.add("option");
            button.innerText = option;
            button.addEventListener("click", () => selectAnswer(option, button));
            quizContainer.appendChild(button);
        });

        nextButton.style.display = "none";
    }

    function selectAnswer(selectedOption, button) {
        const correctAnswer = questions[currentQuestionIndex].answer;
        userAnswers[currentQuestionIndex] = { question: questions[currentQuestionIndex].question, selected: selectedOption, correct: correctAnswer };

        if (selectedOption === correctAnswer) {
            button.classList.add("correct");
        } else {
            button.classList.add("wrong");
        }

        document.querySelectorAll(".option").forEach(btn => btn.disabled = true);
        nextButton.style.display = "inline-block";
    }

    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }

    function showResults() {
        quizContainer.innerHTML = "";
        resultContainer.style.display = "block";
        resultContainer.innerHTML = `<p>Your Score: <span id="final-score">${calculateScore()}</span> / ${questions.length}</p><h3>Review and Correct Answers:</h3>`;

        userAnswers.forEach((entry, index) => {
            const div = document.createElement("div");
            div.innerHTML = `<p><strong>Q:</strong> ${entry.question}</p>`;

            const optionsContainer = document.createElement("div");
            questions[index].options.forEach(option => {
                const optionButton = document.createElement("button");
                optionButton.classList.add("option");
                optionButton.innerText = option;
                if (option === entry.selected) {
                    optionButton.classList.add(option === entry.correct ? "correct" : "wrong");
                }
                optionButton.addEventListener("click", () => updateAnswer(index, option, optionButton));
                optionsContainer.appendChild(optionButton);
            });

            div.appendChild(optionsContainer);
            resultContainer.appendChild(div);
        });

        restartButton.style.display = "inline-block";
    }

    function updateAnswer(questionIndex, newAnswer, button) {
        userAnswers[questionIndex].selected = newAnswer;

        const correctAnswer = userAnswers[questionIndex].correct;
        const buttons = button.parentElement.querySelectorAll(".option");

        buttons.forEach(btn => {
            btn.classList.remove("correct", "wrong");
        });

        if (newAnswer === correctAnswer) {
            button.classList.add("correct");
        } else {
            button.classList.add("wrong");
        }

        document.getElementById("final-score").innerText = calculateScore();
    }

    function calculateScore() {
        return userAnswers.filter(entry => entry.selected === entry.correct).length;
    }

    function restartQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        userAnswers = [];
        resultContainer.style.display = "none";
        restartButton.style.display = "none";
        loadQuestion();
    }

    nextButton.addEventListener("click", nextQuestion);
    restartButton.addEventListener("click", restartQuiz);

    loadQuestion();
});
