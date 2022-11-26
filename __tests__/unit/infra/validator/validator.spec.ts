import { describe, it } from '@jest/globals';
import { validator } from '../../../../src/infra/validators/validator';

const schemaMock = {
  validate: (input, options) => {
    const error = new Error() as any;
    error.errors = ['error', 'error'];
    throw error;
  },
};

describe('Infra - validator', () => {
  it('Should return errors messages if input is invalid', async () => {
    const data = await validator(schemaMock, {});
    expect(data).toBe('error, error');
  });

  it('Should return object if input is valid', async () => {
    schemaMock.validate = (input, options) => ({} as never);
    const data = await validator(schemaMock, {});
    expect(data).toStrictEqual({});
  });
});
