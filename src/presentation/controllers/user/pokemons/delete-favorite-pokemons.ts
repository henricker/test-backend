import {
  DeleteFavoritePokemonsOptions,
  IDeleteFavoritePokemonsUseCase,
} from '../../../../domain/usecases/user/pokemon/delete-favorite-pokemons';
import { Controller } from '../../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../../protocols/http';
import { badRequest, ok, serverError } from '../../../protocols/status-http';
import { IValidator } from '../../../protocols/validator';

export class DeleteFavoritePokemonsController implements Controller {
  constructor(
    private readonly deleteFavoritePokemonsUseCase: IDeleteFavoritePokemonsUseCase,
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

      await this.deleteFavoritePokemonsUseCase.execute(
        payload as DeleteFavoritePokemonsOptions
      );
      return ok(undefined, 204);
    } catch (err) {
      return serverError();
    }
  }
}
