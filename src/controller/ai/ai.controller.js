import aiService from '../../service/ai/ai.service.js';

const aiController = async (req, res) => {
  const { body, header } = req;
  const { authorization } = header;

  const response = await aiService({ body, header, authorization });
  res.status(200).send(response);
}

export default aiController;