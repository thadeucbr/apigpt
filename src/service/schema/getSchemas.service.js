import { UserSchema, ProductSchema, OrderSchema } from '../../database/schema';

const schemas = {
  User: {
    description: "Represents a user in the system.",
    properties: UserSchema.properties,
  },
  Product: {
    description: "Represents a product in the inventory.",
    properties: ProductSchema.properties,
  },
  Order: {
    description: "Represents a customer's order.",
    properties: OrderSchema.properties,
  },
};

const getSchemas = () => {
  return Object.entries(schemas).map(([name, schema]) => ({
    name,
    description: schema.description,
    properties: schema.properties,
  }));
};

export default getSchemas;
