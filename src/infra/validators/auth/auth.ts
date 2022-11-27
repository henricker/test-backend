import * as yup from 'yup';
import { IValidator } from '../../../presentation/protocols/validator';
import { validator } from '../validator';

export class AuthValidator implements IValidator {
  validate(input: any): string | {} | Promise<string | {}> {
    const schema = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required(),
    });

    return validator(schema, input);
  }
}
