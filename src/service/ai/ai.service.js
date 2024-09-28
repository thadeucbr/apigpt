import createUser from '../../database/repository/user/createUser.repository.js';
import gpt from '../../helper/gpt/config/gpt.config.js';

const aiService = async ({ body, header }) => {
  try {
    const context = [{ role: 'system', content: 'You are an AI that manage api responses, you will receive body and header and analyse with your tools wich function to call and send responses. Your response must allways be and JSON in this format: { message, statusCode, status }. Important, dont send JSON in the response' }];

    context.push({ role: 'user', content: JSON.stringify({ body, header }) });

    let response = await gpt({ completion: context })

    async function callTool(gpt) {
      const createdUser = await createUser()
      context.push({ 
        role: 'tool', 
        content: JSON.stringify(createdUser), 
        tool_call_id: gpt.tool_calls[0].id 
      })
    }
    console.log(response)
    context.push(response)
    while (!response.content) {
      callTool(response)
      response = await gpt({ completion: context })
      console.log(response)
      context.push(response)
    }
    return response
  } catch (err) {
    return err.message
  }
}

export default aiService