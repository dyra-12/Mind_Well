let currentQuestion = 1;
const totalQuestions = 10; // Change this to the total number of questions

function selectAnswer(questionId, value) {
    const buttons = document.querySelectorAll(`#${questionId} button`);
    buttons.forEach(button => button.classList.remove('selected'));

    const selectedButton = document.querySelector(`#${questionId} button[value="${value}"]`);
    if (selectedButton) {
        selectedButton.classList.add('selected');
    }
}

function nextQuestion() {
    const currentQuestionElement = document.getElementById(`q${currentQuestion}`);
    const nextQuestionElement = document.getElementById(`q${currentQuestion + 1}`);
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');

    if (currentQuestionElement && nextQuestionElement) {
        currentQuestionElement.classList.remove('active');
        nextQuestionElement.classList.add('active');
        currentQuestion++;

        if (currentQuestion === totalQuestions) {
            nextBtn.classList.add('hidden');
            submitBtn.classList.remove('hidden');
        }
    }
}

function submitQuiz() {
    const form = document.getElementById('quiz-form');
    const resultContainer = document.getElementById('result-container');
    const scoreDisplay = document.getElementById('score');
    const interpr = document.getElementById('inter');

    let score = 0;

    // Assuming totalQuestions is defined somewhere in your code
    for (let i = 1; i <= totalQuestions; i++) {
        const selectedButton = document.querySelector(`#q${i} button.selected`);
        if (selectedButton) {
            score += parseInt(selectedButton.value);
        }
    }

    let anxietyLevel;
    if (score <= 5) {
        anxietyLevel = "No Stress or very mild symptoms.";
        interpr.style.color = "#0C9000"; // Set font color to dark green
    } else if (score <= 10) {
        anxietyLevel = "Mild Stress";
        interpr.style.color = "#34C927"; // Set font color to light green
    } else if (score <= 15) {
        anxietyLevel = "Moderate Stress";
        interpr.style.color = "#D7C100"; // Set font color to yellow
    } else if (score <= 20) {
        anxietyLevel = "Moderately severe Stress";
        interpr.style.color = "#EF9000"; // Set font color to orange
    } else {
        anxietyLevel = "Severe Stress";
        interpr.style.color = "#FF3838"; // Set font color to red
    }

    form.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    scoreDisplay.innerHTML = `Your Score: ${score}`;
    interpr.innerHTML = `You have ${anxietyLevel}`;
}


document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.question button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const questionId = this.closest('.question').id;
            const value = this.value;
            selectAnswer(questionId, value);
        });
    });

    document.getElementById('nextBtn').addEventListener('click', nextQuestion);
    document.getElementById('submitBtn').addEventListener('click', submitQuiz);

    document.getElementById('q1').classList.add('active');
});

document.addEventListener('DOMContentLoaded', function() {
    // Show instructions modal
    const instructionsModal = document.getElementById('instructionsModal');
    const closeButton = document.querySelector('.close');

    instructionsModal.style.display = 'block';

    // Close modal when close button is clicked
    closeButton.addEventListener('click', function() {
        instructionsModal.style.display = 'none';
    });

    // Quiz logic
    // Add your existing quiz JavaScript logic here
});
