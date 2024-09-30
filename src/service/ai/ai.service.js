import gpt from '../../helper/gpt/config/gpt.config.js';
import functions from '../../service/index.js';

const aiService = async ({
  body,
  header,
  query,
  method,
  url,
  firstContext,
}) => {
  try {
    const context = [
      {
        role: 'system',
        content: firstContext,
      },
    ];

    context.push({
      role: 'user',
      content: JSON.stringify({ body, header, query, method, url }),
    });

    let response = await gpt({ completion: context });

    async function callTool(gpt) {
      const { name, arguments: args } = gpt.tool_calls[0].function;
      let functionResponse;

      if (!functions[name]) {
        return {
          message: 'Function not found',
          statusCode: 404,
          status: 'error',
        };
      } else {
        functionResponse = await functions[name](JSON.parse(args));
        console.log(functionResponse);
      }

      context.push({
        role: 'tool',
        content: JSON.stringify(functionResponse),
        tool_call_id: gpt.tool_calls[0].id,
      });
      return null;
    }

    context.push(response);
    let retries = 0;

    while (!response.content && retries < 20) {
      const toolErrorResponse = await callTool(response);

      if (toolErrorResponse) {
        return toolErrorResponse;
      }
      response = await gpt({ completion: context });
      context.push(response);
      retries++;
    }

    return response;
  } catch (err) {
    return err.message;
  }
};

export default aiService;
