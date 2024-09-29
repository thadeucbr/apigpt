import * as models from '../model/index.js';

const aiRepository = async ({ model, query, transaction }) => {
  try {
    const methods = {
      find: async () => {
        return await models[model].find(query).exec();
      },
      findOne: async () => {
        return await models[model].findOne(query).exec();
      },
      create: async () => {
        const document = new models[model](query);
        return await document.save();
      },
      update: async () => {
        return await models[model].updateOne(query.filter, query.update).exec();
      },
      delete: async () => {
        return await models[model].deleteOne(query).exec();
      },
    };
  
    if (methods[transaction] && models[model]) {
      return await methods[transaction]();
    } else {
      if (!methods[transaction]) {
        throw new Error('Invalid transaction type');
      }
      if (!models[model]) {
        throw new Error('Invalid model');
      }
    }
  } catch (err) {
    return { status: 'error', message: err.message};
  }
};

export default aiRepository;