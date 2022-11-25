import { IGetPokemonsUseCase } from '../../domain/usecases/pokemon/get-pokemons-use-case';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';
import { badRequest, ok, serverError } from '../protocols/status-http';
import { IValidator } from '../protocols/validator';

export class GetPokemonsController implements Controller {
  constructor(
    private readonly getPokemonsUseCase: IGetPokemonsUseCase,
    private readonly validator: IValidator
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const validate = await this.validator.validate(request.query);

      if (validate) {
        return badRequest(validate);
      }

      const data = await this.getPokemonsUseCase.execute(request.query);

      return ok(data);
    } catch (err) {
      return serverError();
    }
  }
}
