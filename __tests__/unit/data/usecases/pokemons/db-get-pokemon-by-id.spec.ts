import { describe, it } from '@jest/globals';
import { PokemonMockRepository } from '../../../mocks/repository/pokemon-mock-repository';
import { DbGetPokemonByIdUseCase } from '../../../../../src/data/usecases/pokemons/db-get-pokemon-by-id';
import pokemonMock from '../../../mocks/entities/pokemon-mock';

const makeSut = () => {
  const repository = new PokemonMockRepository();
  const usecase = new DbGetPokemonByIdUseCase(repository);

  return {
    repository,
    usecase,
  };
};

describe('# Usecase - get-pokemon by id', () => {
  it('Should call repository with correct params', async () => {
    const { repository, usecase } = makeSut();
    const getPokemonsSpy = jest.spyOn(repository, 'getPokemonById');
    await usecase.execute(1);
    expect(getPokemonsSpy).toHaveBeenCalledWith(1);
  });

  it('Should throw if repository throws', async () => {
    const { repository, usecase } = makeSut();
    jest.spyOn(repository, 'getPokemonById').mockRejectedValueOnce(() => {
      throw new Error();
    });

    await expect(usecase.execute(1)).rejects.toThrow();
  });

  it('Should return null if pokemon not found', async () => {
    const { repository, usecase } = makeSut();
    jest
      .spyOn(repository, 'getPokemonById')
      .mockResolvedValueOnce(null as never);

    const result = await usecase.execute(1);
    expect(result).toBeNull();
  });

  it('Should return correct data', async () => {
    const { usecase } = makeSut();
    const result = await usecase.execute(1);
    expect(result).toStrictEqual(pokemonMock);
  });
});
