import { IPokemon } from "./pokemon"

export interface IPokemonCharacteristics {
  id: number
  legendary: boolean
  aquireable: number
  spawns: boolean
  regional: boolean
  raidable: number
  hatchable: number;
  shiny: boolean
  nest: boolean
  new: boolean
  NotGettable: boolean
  futureEvolve: boolean
  crossGen: boolean
  generation: number
  pokemon?: IPokemon
}