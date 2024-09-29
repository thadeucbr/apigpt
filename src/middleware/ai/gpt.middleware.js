import aiService from '../../service/ai/ai.service.js';

const gptMiddleware = async (req, res, _next) => {
  console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
  console.log(`Request Body: ${JSON.stringify(req.body)}`);
  console.log(`Request Query: ${JSON.stringify(req.query)}`);
  console.log(`Request Headers: ${JSON.stringify(req.headers)}`);

  const response = await aiService({ body: req.body, header: req.headers, query: req.query, method: req.method, url: req.url });

  const { message, statusCode, status } = JSON.parse(response.content);
  res.status(statusCode).json({ status, message });
}

export default gptMiddleware;