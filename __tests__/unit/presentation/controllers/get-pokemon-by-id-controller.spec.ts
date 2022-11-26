import { describe, it } from '@jest/globals';
import { GetPokemonByIDController } from '../../../../src/presentation/controllers/get-pokemon-by-id';
import pokemonMock from '../../mocks/entities/pokemon-mock';
import { GetPokemonByIDUseCaseMock } from '../../mocks/usecase/get-pokemon-by-id-use-case.mock ';

const makeSut = () => {
  const useCase = new GetPokemonByIDUseCaseMock();
  const controller = new GetPokemonByIDController(useCase);
  return {
    useCase,
    controller,
  };
};

describe('# Controller - get pokemons', () => {
  const request = {
    params: {
      id: '1',
    },
  };

  it('Should return 400 if param is invalid', async () => {
    const { controller } = makeSut();
    const response = await controller.handle({ params: { id: 'invalid' } });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ message: 'id is not provided' });
  });

  it('Should call getPokemonsUseCase with correct params', async () => {
    const { useCase, controller } = makeSut();
    const executeSpy = jest.spyOn(useCase, 'execute');
    await controller.handle(request);
    expect(executeSpy).toHaveBeenCalledWith(1);
  });

  it('Should return 404 if getPokemonsUseCase return null', async () => {
    const { useCase, controller } = makeSut();
    jest.spyOn(useCase, 'execute').mockResolvedValueOnce(null);
    const response = await controller.handle(request);
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ message: 'pokemon not found' });
  });

  it('Should return 500 if getPokemonsUseCase throws', async () => {
    const { useCase, controller } = makeSut();
    jest.spyOn(useCase, 'execute').mockRejectedValueOnce(new Error());
    const response = await controller.handle(request);
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ message: 'Internal server error' });
  });

  it('Should return 200 if getPokemonsUseCase return a pokemon', async () => {
    const { controller } = makeSut();
    const response = await controller.handle(request);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(pokemonMock);
  });
});
