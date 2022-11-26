import { IGetPokemonByIdUseCase } from '../../../domain/usecases/pokemon/get-pokemon-by-id';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import {
  badRequest,
  notFound,
  ok,
  serverError,
} from '../../protocols/status-http';

export class GetPokemonByIDController implements Controller {
  constructor(
    private readonly getPokemonsByIdUseCase: IGetPokemonByIdUseCase
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = request.params;

      if (!id || Number.isNaN(Number(id))) {
        return badRequest('id is not provided');
      }

      const data = await this.getPokemonsByIdUseCase.execute(Number(id));

      if (!data) {
        return notFound('pokemon not found');
      }

      return ok(data);
    } catch (err) {
      return serverError();
    }
  }
}
