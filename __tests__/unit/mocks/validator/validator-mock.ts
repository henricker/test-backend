import { IValidator } from '../../../../src/app/presentation/protocols/validator';

export class ValidatorMock implements IValidator {
  validate(input: any): Promise<string[] | {}> | string[] | {} {
    return {
      limit: 1,
      name: 'pikachu',
      page: 1,
    };
  }
}
