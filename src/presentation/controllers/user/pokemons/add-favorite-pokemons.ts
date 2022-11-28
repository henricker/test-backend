import { BusinessError } from '../../../../domain/errors/business-error';
import {
  AddPokemonFavoriteOptions,
  IAddPokemonFavoriteUseCase,
} from '../../../../domain/usecases/user/pokemon/add-pokemon-favorite';
import { Controller } from '../../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../../protocols/http';
import { badRequest, ok, serverError } from '../../../protocols/status-http';
import { IValidator } from '../../../protocols/validator';

export class AddFavoritePokemonsController implements Controller {
  constructor(
    private readonly addFavoritePokemonsUseCase: IAddPokemonFavoriteUseCase,
    private readonly validator: IValidator
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const payload = await this.validator.validate({
        ...request.body,
        userId: request.user!.id,
      });

      if (typeof payload === 'string') {
        return badRequest(payload);
      }

      await this.addFavoritePokemonsUseCase.execute(
        payload as AddPokemonFavoriteOptions
      );

      return ok(undefined, 201);
    } catch (err) {
      return serverError();
    }
  }
}
