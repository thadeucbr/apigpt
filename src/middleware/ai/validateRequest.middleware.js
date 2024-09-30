import aiService from '../../service/ai/ai.service.js';

const context = 'You are an AI that acts as a middleware for API request validation. You will receive the body, header, query, method, and URL of a request. Your task is to analyze whether all fields in the request adhere to established patterns and are present. If any field is invalid or missing, return an error message in JSON format: { message, statusCode, status }. If it is a creation (POST) or update (PUT) request, you must also check if the schema for that operation exists and is valid using the get_schemas function. If the request is valid and all fields are correct, return a success message in JSON format: { message: "OK", statusCode: "200", status: "OK" }. Important, don’t send ```JSON in the response.';

const validateRequest = async (req, res, next) => { 
  console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
  console.log(`Request Body: ${JSON.stringify(req.body)}`);
  console.log(`Request Query: ${JSON.stringify(req.query)}`);
  console.log(`Request Headers: ${JSON.stringify(req.headers)}`);

  const response = await aiService({ body: req.body, header: req.headers, query: req.query, method: req.method, url: req.url, firstContext: context });

  const { message, statusCode, status } = JSON.parse(response.content);
  console.log({ message, statusCode, status });
  if (statusCode != 200) {
    return res.status(statusCode).json({ status, message });
  }
  next()
}

export default validateRequest