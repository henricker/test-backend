export type DeleteFavoritePokemonsOptions = {
  userId: number;
  pokemonsIds: number[];
};

export interface IDeleteFavoritePokemonsUseCase {
  execute(options: DeleteFavoritePokemonsOptions): Promise<void>;
}
