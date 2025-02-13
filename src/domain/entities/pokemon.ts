import { IPokemonCharacteristics } from './pokemon-characteristics';
import { IPokemonEvolutionInfo } from './pokemon-evolution-info';
import { IPokemonPowerStatus } from './power-status';
import { IUser } from './user';

export interface IPokemon {
  id: number;
  name: string;
  pokedexNumber: number;
  pokemonEvolutionInfoId: number;
  pokemonCharacteristicsId: number;
  powerStatusId: number;
  characteristics?: IPokemonCharacteristics;
  evolutionInfo?: IPokemonEvolutionInfo;
  powerStatus?: IPokemonPowerStatus;
  users?: IUser[];
}
