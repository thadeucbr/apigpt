import gpt from '../../helper/gpt/config/gpt.config.js';

const aiService = async ({ body, header , query, params }) => {
  try {
    const context = [{ role: 'system', content: 'You are an AI that manage api responses, you will receive body and header and analyse with your tools wich function to call and send responses. Your response must allways be and JSON in this format: { message, status }.' }];

    const response = await gpt({ completion: context})
    return response
  } catch (err) {
    return err.message
  }
}

export default aiService