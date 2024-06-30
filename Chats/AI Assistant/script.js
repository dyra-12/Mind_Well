document.addEventListener("DOMContentLoaded", function() {
    // Send initial message to server (Flask app) when the page loads
    fetch("/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: "You're a mental health therapist. Your goal is to create a supportive and comforting environment for individuals seeking guidance. Respond empathetically to user messages, offering advice and insights related to mental health to help them feel at ease and understood." })
    })
    .then(response => response.json())
    .then(data => {
        appendMessage("Chatbot", data.response);
    })
    .catch(error => console.error("Error:", error));
});

function sendMessage() {
    var userInput = document.getElementById("user-input").value;
    if (userInput.trim() !== "") {
        appendMessage("You", userInput);
        document.getElementById("user-input").value = ""; // Clear input field
        // Send message to server (Flask app)
        fetch("/chat/message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: userInput })
        })
        .then(response => response.json())
        .then(data => {
            appendMessage("Chatbot", data.response);
        })
        .catch(error => console.error("Error:", error));
    }
}

function appendMessage(sender, message) {
    var chatBox = document.getElementById("chat-box");
    var messageElement = document.createElement("div");
    messageElement.innerHTML = "<strong>" + sender + ":</strong> " + message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
}
