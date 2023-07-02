import OpenAI from 'openai';

const openai = new OpenAI(process.env.OPENAI_API_KEY);

async function generateText(prompt) {
    const response = await openai.complete({
    engine: 'davinci-codex',
    prompt: prompt,
    max_tokens: 100,
    temperature: 0.8,
    n: 4,
    stop: ['\n']
    });

    return response.choices.map(choice => choice.text.trim());
}
  

export default generateText;
