const chatOutput = document.getElementById('chat-output');
const userInput = document.getElementById('user-input');

let lastMessageTime = 0;
const minTimeBetweenMessages = 10000; // 3 seconds in milliseconds

function sendMessage() {
    const currentTime = Date.now();
    if (currentTime - lastMessageTime < minTimeBetweenMessages) {
        console.log('Too many requests. Please wait before sending another message.');
        return;
    }

    const userMessage = userInput.value;
    appendMessage('user', userMessage);

    // Use the ChatGPT API to get a response
    // Replace 'YOUR_API_KEY' with your actual ChatGPT API key
    const apiKey = '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';
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: userMessage }
            ]
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.choices && data.choices.length > 0) {
            const assistantMessage = data.choices[0].message.content;
            appendMessage('assistant', assistantMessage);
        } else {
            console.error('Unexpected response format:', data);
        }
    })
    .catch(error => console.error('Error:', error))
    .finally(() => {
        lastMessageTime = currentTime;
    });

    // Clear user input
    userInput.value = '';
}

function appendMessage(role, content) {
    const messageElement = document.createElement('div');
    messageElement.classList.add(role);
    messageElement.textContent = content;
    chatOutput.appendChild(messageElement);
}
