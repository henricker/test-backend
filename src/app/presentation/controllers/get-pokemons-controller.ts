import { IGetPokemonsUseCase } from '../../domain/usecases/pokemon/get-pokemons-use-case';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';
import { IValidator } from '../protocols/validator';

export class GetPokemonsController implements Controller {
  constructor(
    private readonly getPokemonsUseCase: IGetPokemonsUseCase,
    private readonly validator: IValidator
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const validate = await this.validator.validate(request.query);

    if (validate) {
      return {
        statusCode: 400,
        body: { message: validate },
      };
    }

    const data = await this.getPokemonsUseCase.execute(request.query);

    return Promise.resolve({ statusCode: 200, body: data });
  }
}
