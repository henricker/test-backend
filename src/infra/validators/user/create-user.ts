import * as yup from 'yup';
import { createUserOptions } from '../../../domain/usecases/user/create-user';
import { IValidator } from '../../../presentation/protocols/validator';
import { validator } from '../validator';

export class CreateUserValidator implements IValidator {
  async validate(input: createUserOptions): Promise<string[] | {}> {
    const schema = yup.object().shape({
      username: yup.string().min(3).required(),
      password: yup
        .string()
        .min(8)
        .max(20)
        .required()
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])(?=.*[@#$%&*!-+&*]).{8,20}$/,
          'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
        ),
      email: yup.string().email().required(),
    });

    return validator(schema, input);
  }
}
