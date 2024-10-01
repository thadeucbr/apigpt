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
      for (const toolCall of gpt.tool_calls) {
        const { name, arguments: args } = toolCall.function;
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
          content: JSON.stringify(functionResponse) || 'Return error',
          tool_call_id: toolCall.id,
        });
      }
    }

    context.push(response);
    let retries = 0;

    while (!response.content && retries < 20) {
      console.log(context);
      await callTool(response);

      response = await gpt({ completion: context });
      context.push(response);
      retries++;
    }
    console.log(context);
    return response;
  } catch (err) {
    return err.message;
  }
};

export default aiService;
