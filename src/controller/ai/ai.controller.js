import aiService from '../../service/ai/ai.service.js';

const aiController = async (req, res) => {
  const { body, headers } = req;
  const response = await aiService({ body, headers });

  const { message, statusCode, status } = JSON.parse(response.content);
  res.status(statusCode).json({ status, message });
  // res.send(response)
}

export default aiController;