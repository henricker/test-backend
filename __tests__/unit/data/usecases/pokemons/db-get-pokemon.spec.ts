import { describe, it } from '@jest/globals';
import { PokemonMockRepository } from '../../../mocks/repository/pokemon-mock-repository';
import { DbGetPokemonUseCase } from '../../../../../src/data/usecases/pokemons/db-get-pokemon';
import pokemonMock from '../../../mocks/entities/pokemon-mock';

const makeSut = () => {
  const repository = new PokemonMockRepository();
  const usecase = new DbGetPokemonUseCase(repository);

  return {
    repository,
    usecase,
  };
};

describe('# Usecase - get-pokemons', () => {
  it('Should call repository with correct params', async () => {
    const { repository, usecase } = makeSut();
    const getPokemonsSpy = jest.spyOn(repository, 'getPokemons');
    await usecase.execute({ limit: 1, page: 1 });
    expect(getPokemonsSpy).toHaveBeenCalledWith({ limit: 1, page: 1 });
  });

  it('Should throw if repository throws', async () => {
    const { repository, usecase } = makeSut();
    jest.spyOn(repository, 'getPokemons').mockRejectedValueOnce(() => {
      throw new Error();
    });

    await expect(usecase.execute({ limit: 1, page: 1 })).rejects.toThrow();
  });

  it('Should return empty array if pokemons not found', async () => {
    const { repository, usecase } = makeSut();
    jest
      .spyOn(repository, 'getPokemons')
      .mockResolvedValueOnce({ data: [], total: 0 } as never);

    const result = await usecase.execute({ limit: 1, page: 1 });
    expect(result).toStrictEqual({ data: [], total: 0 });
  });

  it('Should return correct data', () => {
    const { usecase } = makeSut();
    const result = usecase.execute({ limit: 1, page: 1 });
    expect(result).resolves.toStrictEqual({
      meta: {
        total: 1,
        limit: 1,
        page: 1,
        hasNext: false,
      },
      data: [pokemonMock],
    });
  });
});
