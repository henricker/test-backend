import * as yup from 'yup';
import { getPokemonOptionsQuery } from '../../../domain/usecases/pokemon/get-pokemons';
import { IValidator } from '../../../presentation/protocols/validator';
import { validator } from '../validator';

export class GetPokemonValidator implements IValidator {
  async validate(input: getPokemonOptionsQuery): Promise<string[] | {}> {
    const schema = yup.object().shape({
      limit: yup.number().positive().integer().required(),
      page: yup.number().positive().integer().required(),
      name: yup.string().min(3).optional(),
      type: yup.string().min(3).optional(),
      evolutionStage: yup.number().positive().integer().optional(),
      envolved: yup.boolean().optional(),
      familyId: yup.number().positive().integer().optional(),
      weather: yup.string().min(3).optional(),
      statTotal: yup.number().positive().integer().optional(),
    });

    return validator(schema, input);
  }
}
