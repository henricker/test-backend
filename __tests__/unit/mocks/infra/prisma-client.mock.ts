import { jest } from '@jest/globals';

export const prismaMock = {
  pokemon: {
    findMany: jest.fn,
    count: jest.fn(() => Number),
    findUnique: jest.fn,
  },
  user: {
    findUnique: jest.fn,
    create: jest.fn,
  },
};
