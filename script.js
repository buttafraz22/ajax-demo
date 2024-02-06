function fetchTrivia() {
            
    var categoryInput = document.getElementById('category-input').value;
    
    // Check if the input is a number (category ID) or a string (category name)
    var isCategoryId = !isNaN(categoryInput);
    var apiUrl = `https://opentdb.com/api.php?amount=1&${isCategoryId ? 'category' : 'category_name'}=${encodeURIComponent(categoryInput)}`;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', apiUrl, true);

    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            var triviaData = JSON.parse(xhr.responseText);
            console.log(triviaData);
            displayTrivia(triviaData);
        } else {
            console.error('Failed to fetch trivia data');
        }
    };

    xhr.send();
}

function displayTrivia(triviaData) {
    
    var triviaContainer = document.getElementById('trivia-container');

    // Clear any existing content
    triviaContainer.innerHTML = '';

    if (triviaData.response_code === 0) {
        // Display the trivia question and answer
        var question = triviaData.results[0].question;
        var answer = triviaData.results[0].correct_answer;

        triviaContainer.innerHTML = `<p><strong>Question:</strong> ${question}</p>
                                    <p><strong>Answer:</strong> ${answer}</p>`;
    } else {
        // Display an error message if no questions are found for the category
        triviaContainer.textContent = 'No trivia questions found for the specified category.';
    }
    console.log('Inside function')
}