import { describe, it } from '@jest/globals';
import { PokemonPrismaRepository } from '../../../../../src/app/infra/db/prisma/pokemon-prisma-repository';
import { prismaMock } from '../../../mocks/infra/prisma-client.mock';

const makeSut = () => {
  const repository = new PokemonPrismaRepository(prismaMock as any);
  return {
    repository,
  };
};

describe('# Infra - Prisma - Pokemon Prisma Repository', () => {
  describe('getPokemons()', () => {
    const options = {
      limit: 10,
      page: 1,
      name: 'Pikachu',
      type: 'electric',
    };

    it('Should call findmany and count of prisma client with correct conditions and pagination params', async () => {
      const { repository } = makeSut();
      const where = {
        name: options?.name,
        pokemonEvolutionInfo: {
          evolutionStage: undefined,
          envolved: undefined,
          familyId: undefined,
        },
        type: {
          some: {
            name: options?.type,
          },
        },
        weather: {
          some: {
            name: undefined,
          },
        },
      };

      const joins = {
        powerStatus: true,
        pokemonEvolutionInfo: true,
        pokemonCharacteristics: true,
        type: {
          select: {
            name: true,
          },
        },
        weather: {
          select: {
            name: true,
          },
        },
      };

      const findManySpy = jest.spyOn(prismaMock.pokemon, 'findMany');
      const countSpy = jest.spyOn(prismaMock.pokemon, 'count');
      await repository.getPokemons(options);

      expect(findManySpy).toHaveBeenCalledWith({
        where,
        include: joins,
        take: options.limit,
        skip: (options.page - 1) * options.limit,
      });
      expect(countSpy).toHaveBeenCalledWith({ where });
    });

    it('Should throw if client throws', async () => {
      const { repository } = makeSut();
      jest.spyOn(prismaMock.pokemon, 'findMany').mockImplementationOnce(() => {
        throw new Error();
      });
      await expect(repository.getPokemons(options)).rejects.toThrow();
    });

    it('Should return data and meta with correct values', async () => {
      const { repository } = makeSut();

      jest.spyOn(prismaMock.pokemon, 'count').mockResolvedValueOnce(0 as never);

      jest
        .spyOn(prismaMock.pokemon, 'findMany')
        .mockResolvedValueOnce([] as never);

      const data = await repository.getPokemons(options);

      const expected = {
        data: [],
        meta: {
          total: 0,
          limit: 10,
          page: 1,
          hasNext: false,
        },
      };

      expect(data).toEqual(expected);
    });
  });
});
