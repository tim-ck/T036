# TransitVista Chatbot

This project is a chatbot application that provides travel assistance, specifically for flights and bus routes. The chatbot uses a machine learning model to generate responses based on user queries.

## Prerequisites

- Python 3.7 or higher
- Node.js and npm
- Flask
- Required Python packages (listed in `requirements.txt`)

## Setup

1. Clone the repository:

    ```sh
    git clone https://github.com/your-repo/transitvista-chatbot.git
    cd transitvista-chatbot
    ```

2. Install the required Python packages:

    ```sh
    pip install -r requirements.txt
    ```

3. Install the required Node.js packages:

    ```sh
    npm install
    ```

## Running the Application

### Step 1: Start the Flask Server

1. Navigate to the project directory:

    ```sh
    cd transitvista-chatbot
    ```

2. Start the Flask server:

    ```sh
    python model.py
    ```

   The server will start on `http://127.0.0.1:5000`.

### Step 2: Open the Chatbot Interface

1. Open [chatbot.html](http://_vscodecontentref_/0) in your web browser:

    ```sh
    open chatbot.html
    ```

   This will open the chatbot interface where you can interact with the chatbot.

## Project Structure

- [chatbot.html](http://_vscodecontentref_/1): The HTML file for the chatbot interface.
- [chatbot.js](http://_vscodecontentref_/2): The JavaScript file for handling user interactions and API calls.
- [conversation.json](http://_vscodecontentref_/3): The JSON file containing predefined questions and responses.
- [model.py](http://_vscodecontentref_/4): The Python file for the Flask server and machine learning model.
- [style.css](http://_vscodecontentref_/5): The CSS file for styling the chatbot interface.

## Usage

- Enter your message in the text area and click the send button or press Enter to send your message.
- The chatbot will respond based on the predefined responses in [conversation.json](http://_vscodecontentref_/6) or generate a response using the machine learning model.

## License

This project is licensed under the MIT License.