import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/get-chatgpt-response', async (req, res) => {
    const apiKey = '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'; // Replace with your actual ChatGPT API key
    const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            prompt: req.body.message,
            max_tokens: 100
        })
    });

    const responseData = await response.json();
    res.json({ chatgptResponse: responseData.choices[0].text });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
