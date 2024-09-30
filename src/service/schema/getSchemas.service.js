import {
  UserSchema,
  ProductSchema,
  OrderSchema,
} from '../../database/schema/index.js';
const schemas = {
  User: {
    description: 'Represents a user in the system.',
    properties: UserSchema.obj,
    model: 'User',
  },
  Product: {
    description: 'Represents a product in the inventory.',
    properties: ProductSchema.obj,
    model: 'Product',
  },
  Order: {
    description: "Represents a customer's order.",
    properties: OrderSchema.obj,
    model: 'Order',
  },
};

const getSchemas = () => {
  return Object.entries(schemas).map(([name, schema]) => ({
    name,
    description: schema.description,
    properties: schema.properties,
    model: schema.model,
  }));
};

export default getSchemas;
