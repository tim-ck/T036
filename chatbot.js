const chatbox = document.querySelector('.chatbox');
const textarea = document.querySelector('textarea');
const sendBtn = document.querySelector('#send-btn');

// Function to create a new message element
function createMessageElement(message, type) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('chat', type);

  const messageContent = `<p>${message}</p>`;

  messageDiv.innerHTML = messageContent;

  chatbox.appendChild(messageDiv);

  // Scroll to bottom
  chatbox.scrollTop = chatbox.scrollHeight;
}

async function fetchConversations() {
  try {
    const response = await fetch('conversation.json');
    if (!response.ok) {
      throw new Error('Failed to load conversation data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return { conversation: [] }; // Return an empty array if there's an error
  }
}

// Function to handle sending user message
async function sendMessage() {
  const userMessage = textarea.value.trim();

  if (userMessage === '') return; // Don't send empty messages

  // Display user's message
  createMessageElement(userMessage, 'outgoing');

  // Clear textarea after sending
  textarea.value = '';

  // Log the message being sent
  console.log("Sending message:", userMessage);

  try {
    const apiResponse = await fetch('http://127.0.0.1:5000/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'chatbot_role': 'assistant',
        'question': userMessage,
        'chat_history': []
      })
    });

    // Log API response status
    console.log("API Response Status:", apiResponse.status);

    if (!apiResponse.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await apiResponse.json();

    // Log API response data
    console.log("API Response Data:", data);

    // Display bot's response from API
    createMessageElement(data.response, 'incoming');

  } catch (error) {
    console.error('Error calling API:', error);
    const defaultResponse = "I'm sorry, there was an error communicating with the server.";
    createMessageElement(defaultResponse, 'incoming');
    console.log("API Response Error Code:", error);
  }
}

// Event listener for Send button click
sendBtn.addEventListener('click', () => {
  console.log("Send button clicked");
  sendMessage();
});

textarea.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault(); // Prevent default Enter behavior (new line)
    console.log("Enter key pressed");
    sendMessage();
  }
});