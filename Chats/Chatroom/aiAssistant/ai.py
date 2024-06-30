import openai

# Set your API key
openai.api_key = 'YOUR_API_KEY'

# Make a request to the OpenAI GPT API
response = openai.Completion.create(
    engine="text-davinci-003",  # or other engine of your choice
    prompt="Write a Python function to",
    max_tokens=100
)

# Print the generated text
print(response.choices[0].text.strip())