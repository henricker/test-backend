import { describe, it } from '@jest/globals';
import { DeleteFavoritePokemonsUseCaseMock } from '../../../../mocks/usecase/user/pokemons/delete-favorite-pokemons-use-case-mock';
import { ValidatorMock } from '../../../../mocks/validator/validator-mock';
import { DeleteFavoritePokemonsController } from '../../../../../../src/presentation/controllers/user/pokemons/delete-favorite-pokemons';
import { HttpRequest } from '../../../../../../src/presentation/protocols/http';

const makeSut = () => {
  const usecase = new DeleteFavoritePokemonsUseCaseMock();
  const validator = new ValidatorMock();
  const controller = new DeleteFavoritePokemonsController(usecase, validator);

  return {
    usecase,
    validator,
    controller,
  };
};

describe('# Controller - delete favorite pokemons', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  const request = {
    user: {
      id: 1,
    },
    body: {
      pokemonsIds: [1, 2, 3],
    },
  };

  it('Should return 500 if validator throws', async () => {
    const { controller, validator } = makeSut();
    jest.spyOn(validator, 'validate').mockRejectedValueOnce(new Error());

    const response = await controller.handle({});

    expect(response.statusCode).toBe(500);
  });
  it('Should return 400 if validator returns error', async () => {
    const { controller, validator } = makeSut();
    const validateSpy = jest
      .spyOn(validator, 'validate')
      .mockResolvedValueOnce('any_error');

    const response = await controller.handle(request as HttpRequest);

    expect(response.statusCode).toBe(400);
    expect(validateSpy).toHaveBeenCalledWith({
      userId: 1,
      pokemonsIds: [1, 2, 3],
    });
  });
  it('Should throw if repository throws', async () => {
    const { controller, usecase } = makeSut();
    jest.spyOn(usecase, 'execute').mockRejectedValueOnce(new Error());

    const response = await controller.handle(request as HttpRequest);

    expect(response.statusCode).toBe(500);
  });
  it('Should return 200 and call repository with correct values if all is ok', async () => {
    const { controller, usecase, validator } = makeSut();
    jest.spyOn(validator, 'validate').mockResolvedValueOnce({
      userId: 1,
      pokemonsIds: [1, 2, 3],
    });
    const executeSpy = jest.spyOn(usecase, 'execute');

    const response = await controller.handle(request as HttpRequest);

    expect(response.statusCode).toBe(204);
    expect(executeSpy).toHaveBeenCalledWith({
      userId: 1,
      pokemonsIds: [1, 2, 3],
    });
  });
});
