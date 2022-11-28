import { describe, it } from '@jest/globals';
import { AddFavoritePokemonsUseCaseMock } from '../../../../mocks/usecase/user/pokemons/add-favorite-pokemons-use-case-mock';
import { AddFavoritePokemonsController } from '../../../../../../src/presentation/controllers/user/pokemons/add-favorite-pokemons';
import { ValidatorMock } from '../../../../mocks/validator/validator-mock';
import { AddPokemonFavoriteOptions } from '../../../../../../src/domain/usecases/user/pokemon/add-pokemon-favorite';
import { IValidator } from '../../../../../../src/presentation/protocols/validator';
import { HttpRequest } from '../../../../../../src/presentation/protocols/http';

const makeSut = () => {
  const usecase = new AddFavoritePokemonsUseCaseMock();
  const validator = new ValidatorMock();
  const controller = new AddFavoritePokemonsController(usecase, validator);

  return {
    usecase,
    validator,
    controller,
  };
};

describe('# Controller - Add favorite pokemons', () => {
  const request = {
    body: {
      pokemonsId: [1, 2],
    },
    user: {
      id: 1,
    },
  };
  it('Should return 500 if validator throws', async () => {
    const { controller, validator } = makeSut();
    jest.spyOn(validator, 'validate').mockImplementationOnce(() => {
      throw new Error();
    });

    const response = await controller.handle(request as HttpRequest);

    expect(response.statusCode).toBe(500);
  });
  it('Should return 400 if validator returns error', async () => {
    const { controller, validator } = makeSut();
    jest.spyOn(validator, 'validate').mockReturnValueOnce('error, error');

    const response = await controller.handle(request as HttpRequest);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('error, error');
  });

  it('Should return 500 if usecase throws', async () => {
    const { controller, usecase, validator } = makeSut();

    jest.spyOn(validator, 'validate').mockResolvedValueOnce({
      userId: 1,
      pokemonsId: [1],
    });

    jest.spyOn(usecase, 'execute').mockImplementationOnce(() => {
      throw new Error();
    });

    const response = await controller.handle(request as HttpRequest);

    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBe('Internal server error');
  });

  it('Should return 201 if usecase all is right', async () => {
    const { controller, usecase, validator } = makeSut();

    jest.spyOn(validator, 'validate').mockResolvedValueOnce({
      userId: 1,
      pokemonsId: [1],
    });

    jest.spyOn(usecase, 'execute').mockResolvedValueOnce();
    const response = await controller.handle(request as HttpRequest);
    expect(response.statusCode).toBe(201);
  });
});
