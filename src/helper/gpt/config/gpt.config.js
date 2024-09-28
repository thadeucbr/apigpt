import OpenAI from 'openai';
import tools from '../tool/index.js'
export default async function gpt({ completion }) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL,
    messages: [completion],
    temperature: process.env.OPENAI_TEMPERATURE,
    tools
  })

  return response.choices[0].message
}