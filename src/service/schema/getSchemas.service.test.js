import { describe, it, expect, vi } from 'vitest';
import getSchemas from './getSchemas.service.js';

vi.mock('../../database/schema/index.js', () => ({
  UserSchema: {
    obj: {
      username: { type: 'string' },
      password: { type: 'string' },
    },
  },
  ProductSchema: {
    obj: {
      name: { type: 'string' },
      price: { type: 'number' },
    },
  },
  OrderSchema: {
    obj: {
      userId: { type: 'string' },
      productIds: { type: 'array' },
    },
  },
}));

describe('getSchemas', () => {
  it('should return the correct schemas', () => {
    const expectedResult = [
      {
        name: 'User',
        description: "Represents a user in the system.",
        properties: {
          username: { type: 'string' },
          password: { type: 'string' },
        },
        model: 'User',
      },
      {
        name: 'Product',
        description: "Represents a product in the inventory.",
        properties: {
          name: { type: 'string' },
          price: { type: 'number' },
        },
        model: 'Product',
      },
      {
        name: 'Order',
        description: "Represents a customer's order.",
        properties: {
          userId: { type: 'string' },
          productIds: { type: 'array' },
        },
        model: 'Order',
      },
    ];

    const result = getSchemas();
    expect(result).toEqual(expectedResult);
  });
});
