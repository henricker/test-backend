import { IValidator } from '../../../../src/app/presentation/protocols/validator';

export class ValidatorMock implements IValidator {
  validate(input: any): Promise<string[] | undefined> | string[] | undefined {
    return undefined;
  }
}
