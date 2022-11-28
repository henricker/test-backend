import { describe, it } from '@jest/globals';
import { GetFavoritePokemonsUseCaseMock } from '../../../../mocks/usecase/user/pokemons/get-favorite-pokemons-use-case-mock';
import { GetFavoritePokemonsController } from '../../../../../../src/presentation/controllers/user/pokemons/get-favorite-pokemons';
import { ValidatorMock } from '../../../../mocks/validator/validator-mock';
import pokemonMock from '../../../../mocks/entities/pokemon-mock';
import { HttpRequest } from '../../../../../../src/presentation/protocols/http';

const makeSut = () => {
  const usecase = new GetFavoritePokemonsUseCaseMock();
  const validator = new ValidatorMock();
  const controller = new GetFavoritePokemonsController(usecase, validator);

  return {
    usecase,
    validator,
    controller,
  };
};

describe('# Controller - get favorite pokemons', () => {
  const request = {
    query: {
      limit: 1,
      name: 'pikachu',
      page: 1,
    },
    user: {
      id: 1,
    },
  };
  it('Should return 500 if validator throws', async () => {
    const { controller, validator } = makeSut();
    jest.spyOn(validator, 'validate').mockRejectedValueOnce(new Error());

    const result = await controller.handle({});

    expect(result.statusCode).toBe(500);
    expect(result.body.message).toBe('Internal server error');
  });
  it('Should return 400 if validator returns error', async () => {
    const { controller, validator } = makeSut();
    jest.spyOn(validator, 'validate').mockReturnValueOnce('error');

    const result = await controller.handle(request as HttpRequest);

    expect(result.statusCode).toBe(400);
    expect(result.body.message).toBe('error');
  });
  it('Should return 500 if usecase throws', async () => {
    const { controller, usecase } = makeSut();
    jest.spyOn(usecase, 'execute').mockRejectedValueOnce(new Error());

    const result = await controller.handle({});

    expect(result.statusCode).toBe(500);
    expect(result.body.message).toBe('Internal server error');
  });
  it('Should return 200 if all is ok', async () => {
    const { controller, usecase, validator } = makeSut();

    jest.spyOn(validator, 'validate').mockResolvedValueOnce(request.query);
    const executeSpy = jest.spyOn(usecase, 'execute');
    const result = await controller.handle(request as HttpRequest);

    expect(result.statusCode).toBe(200);
    expect(executeSpy).toHaveBeenCalledWith(request.query);
    expect(result.body.data).toEqual([pokemonMock]);
    expect(result.body.meta).toEqual({
      total: 1,
      limit: 1,
      page: 1,
      hasNext: false,
    });
  });
});
