import gpt from '../../helper/gpt/config/gpt.config.js';
import functions from '../../service/index.js';

const aiService = async ({ body, header, query, method, url }) => {
  try {
    const context = [
      { 
        role: 'system', 
        content: 'You are an AI that manage api responses, you will receive body and header and analyse with your tools which function to call and send responses. Your response must always be in JSON in this format: { message, statusCode, status }. Important, don’t send JSON in the response' 
      }
    ];

    context.push({ role: 'user', content: JSON.stringify({ body, header, query, method, url }) });

    let response = await gpt({ completion: context });

    async function callTool(gpt) {
      const { name, arguments: args } = gpt.tool_calls[0].function;
      let functionResponse;

      if (!functions[name]) {
        return { message: 'Function not found', statusCode: 404, status: 'error' }; // Retorna imediatamente
      } else {
        functionResponse = await functions[name](JSON.parse(args));
        console.log(functionResponse);
      }

      context.push({ 
        role: 'tool', 
        content: JSON.stringify(functionResponse) || functionResponse.message, 
        tool_call_id: gpt.tool_calls[0].id 
      });
      return null; // Retorna null se não houver erro
    }

    context.push(response);
    let retries = 0;

    while (!response.content && retries < 20) {
      const toolErrorResponse = await callTool(response); // Captura a resposta da função
      if (toolErrorResponse) {
        return toolErrorResponse; // Se houve erro, retorna imediatamente
      }

      response = await gpt({ completion: context });
      context.push(response);
      retries++;
    }

    return response;
  } catch (err) {
    return err.message;
  }
}

export default aiService;
