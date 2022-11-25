import { describe, it } from '@jest/globals';
import { GetPokemonUseCaseMock } from '../../mocks/usecase/get-pokemon-use-case-mock';
import { GetPokemonsController } from '../../../../src/presentation/controllers/get-pokemons-controller';
import { ValidatorMock } from '../../mocks/validator/validator-mock';

const makeSut = () => {
  const useCase = new GetPokemonUseCaseMock();
  const validator = new ValidatorMock();
  const controller = new GetPokemonsController(useCase, validator);

  return {
    useCase,
    validator,
    controller,
  };
};

describe('# Controller - get pokemons', () => {
  const request = {
    query: {
      limit: 1,
      page: 1,
      name: 'pikachu',
    },
  };

  it('Should call validate with correct params', () => {
    const { validator, controller } = makeSut();
    const validateSpy = jest.spyOn(validator, 'validate');
    controller.handle(request);
    expect(validateSpy).toHaveBeenCalledWith({
      page: 1,
      limit: 1,
      name: 'pikachu',
    });
  });

  it('Should return 400 if validate return an error', async () => {
    const { validator, controller } = makeSut();
    jest.spyOn(validator, 'validate').mockReturnValueOnce('error, error');
    const response = await controller.handle(request);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ message: 'error, error' });
  });

  it('Should call getPokemonsUseCase with correct params', async () => {
    const { useCase, controller } = makeSut();
    const executeSpy = jest.spyOn(useCase, 'execute');
    await controller.handle(request);
    expect(executeSpy).toHaveBeenCalledWith({
      limit: 1,
      page: 1,
      name: 'pikachu',
    });
  });

  it('Should return 500 if getPokemonsUseCase throws', async () => {
    const { useCase, controller } = makeSut();
    jest.spyOn(useCase, 'execute').mockRejectedValueOnce(new Error());
    const response = await controller.handle(request);
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ message: 'Internal server error' });
  });

  it('Should error 200 with correct data', async () => {
    const { controller } = makeSut();
    const response = await controller.handle(request);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      meta: {
        total: 1,
        limit: 1,
        page: 1,
        hasNext: false,
      },
      data: [],
    });
  });
});
