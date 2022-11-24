-- CreateTable
CREATE TABLE "Pokemon" (
    "id" SERIAL NOT NULL,
    "pokedexNumber" INTEGER NOT NULL,
    "pokemonEvolutionInfoId" INTEGER NOT NULL,
    "pokemonCharacteristicsId" INTEGER NOT NULL,
    "powerStatusId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypePokemon" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TypePokemon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PokemonTypePokemon" (
    "id" SERIAL NOT NULL,
    "pokemonId" INTEGER NOT NULL,
    "typePokemonId" INTEGER NOT NULL,

    CONSTRAINT "PokemonTypePokemon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Weather" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Weather_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PokemonWeather" (
    "id" SERIAL NOT NULL,
    "pokemonId" INTEGER NOT NULL,
    "weatherId" INTEGER NOT NULL,

    CONSTRAINT "PokemonWeather_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PowerStatus" (
    "id" SERIAL NOT NULL,
    "atk" INTEGER NOT NULL,
    "def" INTEGER NOT NULL,
    "sta" INTEGER NOT NULL,
    "statTotal" INTEGER NOT NULL,
    "cp_100_40" INTEGER NOT NULL,
    "cp_100_39" INTEGER NOT NULL,

    CONSTRAINT "PowerStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PokemonCharacteristics" (
    "id" SERIAL NOT NULL,
    "legendary" BOOLEAN NOT NULL,
    "aquireable" INTEGER NOT NULL,
    "spawns" BOOLEAN NOT NULL,
    "regional" BOOLEAN NOT NULL,
    "raidable" INTEGER NOT NULL,
    "hatchable" INTEGER NOT NULL,
    "shiny" BOOLEAN NOT NULL,
    "nest" BOOLEAN NOT NULL,
    "new" BOOLEAN NOT NULL,
    "NotGettable" BOOLEAN NOT NULL,
    "futureEvolve" BOOLEAN NOT NULL,
    "crossGen" BOOLEAN NOT NULL,
    "generation" INTEGER NOT NULL,

    CONSTRAINT "PokemonCharacteristics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PokemonEvolutionInfo" (
    "id" SERIAL NOT NULL,
    "evolutionStage" INTEGER NOT NULL,
    "envolved" BOOLEAN NOT NULL,
    "familyId" INTEGER NOT NULL,

    CONSTRAINT "PokemonEvolutionInfo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pokemon" ADD CONSTRAINT "Pokemon_pokemonEvolutionInfoId_fkey" FOREIGN KEY ("pokemonEvolutionInfoId") REFERENCES "PokemonEvolutionInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pokemon" ADD CONSTRAINT "Pokemon_pokemonCharacteristicsId_fkey" FOREIGN KEY ("pokemonCharacteristicsId") REFERENCES "PokemonCharacteristics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pokemon" ADD CONSTRAINT "Pokemon_powerStatusId_fkey" FOREIGN KEY ("powerStatusId") REFERENCES "PowerStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonTypePokemon" ADD CONSTRAINT "PokemonTypePokemon_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonTypePokemon" ADD CONSTRAINT "PokemonTypePokemon_typePokemonId_fkey" FOREIGN KEY ("typePokemonId") REFERENCES "TypePokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonWeather" ADD CONSTRAINT "PokemonWeather_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonWeather" ADD CONSTRAINT "PokemonWeather_weatherId_fkey" FOREIGN KEY ("weatherId") REFERENCES "Weather"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
