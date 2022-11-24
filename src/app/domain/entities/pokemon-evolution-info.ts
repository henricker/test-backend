import { IPokemon } from "./pokemon";

export interface IPokemonEvolutionInfo {
  id: number;
  evolutionStage: number;
  envolved: boolean;
  familyId: number;
  pokemon?: IPokemon
}