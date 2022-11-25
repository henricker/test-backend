import { jest } from '@jest/globals';

export const prismaMock = {
  pokemon: {
    findMany: jest.fn,
    count: jest.fn(() => Number),
  },
};
