import { IPokemon } from './pokemon';

export interface IPokemonPowerStatus {
  id: number;
  atk: number;
  def: number;
  sta: number;
  statTotal: number;
  cp_100_40: number;
  cp_100_39: number;
  pokemon?: IPokemon;
}
