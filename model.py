from flask import Flask, request, jsonify
from mlx_lm import load, generate
from flask_cors import CORS
import json
import markdown

app = Flask(__name__)
CORS(app)  # allow cross-origin requests from any domain

# Define your model to import
model_name = "mlx-community/Llama-3.2-3B-Instruct"

# Loading model
model, tokenizer = load(model_name)

# Load knowledge base from JSON file
with open('conversation.json') as f:
    knowledge_base = json.load(f)

@app.route('/generate', methods=['POST'])
def generate_response():
    data = request.json
    question = data.get('question')

    chatbot_role = "You are cathay pacific airline travel assistance chatbox. user are mainly from other places to china through hong kong. provide a flight suggest with layover in hong kong then bus to that place in china. reply in markdown format so it look pretty"
    chat_history = data.get('chat_history', [])

    messages = [{"role": "system", "content": chatbot_role}]
    
    for interaction in knowledge_base:
        messages.append({"role": "assistant", "content": interaction['question']})
        messages.append({"role": "assistant", "content": interaction['response']})

    for interaction in chat_history:
        messages.append({"role": "user", "content": interaction['question']})
        messages.append({"role": "assistant", "content": interaction['response']})

    messages.append({"role": "user", "content": question})

    # Apply the chat template to format the input for the model
    # (Assuming there's more code here to handle the model response)

    # Apply the chat template to format the input for the model
    input_ids = tokenizer.apply_chat_template(messages, add_generation_prompt=True)
    # Decode the tokenized input back to text format to be used as a prompt for the model
    prompt = tokenizer.decode(input_ids)

    # Generate a response using the model
    response = generate(model, tokenizer, max_tokens=512, prompt=prompt)
    
    # Process the generated response using Markdown
    formatted_response = markdown.markdown(response)
    
    return jsonify({'response': formatted_response})

if __name__ == '__main__':
    app.run(port=5000)