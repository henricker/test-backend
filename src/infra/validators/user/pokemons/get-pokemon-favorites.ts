import * as yup from 'yup';
import { IValidator } from '../../../../presentation/protocols/validator';
import { validator } from '../../validator';

export class GetFavoritePokemonsValidator implements IValidator {
  validate(input: any) {
    const schema = yup.object().shape({
      page: yup.number().required(),
      limit: yup.number().required(),
      userId: yup.number().required(),
      name: yup.string().optional(),
    });

    return validator(schema, input);
  }
}
