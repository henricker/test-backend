import * as yup from 'yup';
import { IValidator } from '../../../../presentation/protocols/validator';
import { validator } from '../../validator';

export class DeleteFavoritePokemonsValidator implements IValidator {
  validate(input: any) {
    const schema = yup.object().shape({
      userId: yup.number().required(),
      pokemonsIds: yup.array().of(yup.number()).required(),
    });

    return validator(schema, input);
  }
}
