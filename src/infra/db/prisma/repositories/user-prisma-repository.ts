import { PrismaClient } from '@prisma/client';
import { IUserRepository } from '../../../../data/repositories/user/user-repository';
import { IPokemon } from '../../../../domain/entities/pokemon';
import { IUser } from '../../../../domain/entities/user';
import { createUserOptions } from '../../../../domain/usecases/user/create-user';
import { AddPokemonFavoriteOptions } from '../../../../domain/usecases/user/pokemon/add-pokemon-favorite';
import { DeleteFavoritePokemonsOptions } from '../../../../domain/usecases/user/pokemon/delete-favorite-pokemons';
import { GetPokemonsFavoriteOptions } from '../../../../domain/usecases/user/pokemon/get-pokemons-favorite';
import { PaginationData } from '../../../../domain/util/pagination-data';

export class UserPrismaRepository implements IUserRepository {
  constructor(private readonly connection: PrismaClient) {}

  async deleteFavoritePokemons(
    options: DeleteFavoritePokemonsOptions
  ): Promise<void> {
    await this.connection.user.update({
      where: { id: options.userId },
      data: {
        favoritesPokemons: {
          disconnect: options.pokemonsIds.map((id) => ({ id })),
        },
      },
    });
  }

  async addPokemonsFavorite(options: AddPokemonFavoriteOptions): Promise<void> {
    await this.connection.user.update({
      where: { id: options.userId },
      data: {
        favoritesPokemons: {
          connect: options.pokemonsId.map((id) => ({ id })),
        },
      },
    });
  }

  createUser(user: createUserOptions): Promise<IUser> {
    return this.connection.user.create({
      data: user,
    });
  }

  findUserByEmail(email: string): Promise<IUser> {
    return this.connection.user.findUnique({
      where: { email },
    });
  }

  findUserByUsername(username: string): Promise<IUser> {
    return this.connection.user.findUnique({
      where: { username },
    });
  }

  findUserById(id: number): Promise<IUser> {
    return this.connection.user.findUnique({
      where: { id },
    });
  }

  async findFavoritesPokemons(
    options: GetPokemonsFavoriteOptions
  ): Promise<PaginationData<IPokemon>> {
    const where = {
      name: options.name,
      User: {
        some: {
          id: options.userId,
        },
      },
    };

    const data = await this.connection.pokemon.findMany({
      where,
      skip: (options.page - 1) * options.limit,
      take: options.limit,
      include: {
        weather: true,
        type: true,
        powerStatus: true,
      },
    });

    const total = await this.connection.pokemon.count({
      where,
    });

    const meta = {
      total,
      page: options.page,
      limit: options.limit,
      hasNext: total > options.page * options.limit,
    };

    return {
      data,
      meta,
    };
  }
}
