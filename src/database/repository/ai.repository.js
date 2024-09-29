const aiRepository = async (model, query, transaction) => {
  const methods = {
    find: async () => {
      return await model.find(query).exec();
    },
    findOne: async () => {
      return await model.findOne(query).exec();
    },
    create: async () => {
      const document = new model(query);
      return await document.save();
    },
    update: async () => {
      return await model.updateOne(query.filter, query.update).exec();
    },
    delete: async () => {
      return await model.deleteOne(query).exec();
    },
  };

  if (methods[transaction]) {
    return await methods[transaction]();
  } else {
    throw new Error('Invalid transaction type');
  }
};
