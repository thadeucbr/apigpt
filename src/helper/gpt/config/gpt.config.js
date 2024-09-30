import OpenAI from 'openai';
import * as tools from '../tool/index.js';
export default async function gpt({ completion }) {
  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: completion,
      // temperature: process.env.OPENAI_TEMPERATURE,
      tools: tools.default,
    });
    if (response.choices[0].message.tool_calls) {
      console.log(response.choices[0].message.tool_calls);
    }
    return response.choices[0].message;
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
}
