import { BusinessError } from '../../../../domain/errors/business-error';
import {
  GetPokemonsFavoriteOptions,
  IGetPokemonsFavoriteUseCase,
} from '../../../../domain/usecases/user/pokemon/get-pokemons-favorite';
import { Controller } from '../../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../../protocols/http';
import { badRequest, ok, serverError } from '../../../protocols/status-http';
import { IValidator } from '../../../protocols/validator';

export class GetFavoritePokemonsController implements Controller {
  constructor(
    private readonly getFavoritePokemonsUseCase: IGetPokemonsFavoriteUseCase,
    private readonly validator: IValidator
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const payload = await this.validator.validate({
        ...request.query,
        userId: request.user!.id,
      });

      if (typeof payload === 'string') {
        return badRequest(payload);
      }

      const data = await this.getFavoritePokemonsUseCase.execute(
        payload as GetPokemonsFavoriteOptions
      );

      return ok(data);
    } catch (err) {
      return serverError();
    }
  }
}
