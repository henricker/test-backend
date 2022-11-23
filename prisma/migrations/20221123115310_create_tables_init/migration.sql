-- CreateTable
CREATE TABLE "Pokemon" (
    "pokedexNumber" INTEGER NOT NULL,
    "typePokemonId" INTEGER,

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("pokedexNumber")
);

-- CreateTable
CREATE TABLE "TypePokemon" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TypePokemon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Weather" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Weather_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeatherPokemon" (
    "id" SERIAL NOT NULL,
    "weatherId" INTEGER NOT NULL,
    "pokemonId" INTEGER NOT NULL,

    CONSTRAINT "WeatherPokemon_pkey" PRIMARY KEY ("id")
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
    "pokemonId" INTEGER NOT NULL,

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
    "pokemonId" INTEGER NOT NULL,

    CONSTRAINT "PokemonCharacteristics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PokemonEvolutionInfo" (
    "id" SERIAL NOT NULL,
    "evolutionStage" INTEGER NOT NULL,
    "envolved" BOOLEAN NOT NULL,
    "familyId" INTEGER NOT NULL,
    "pokemonId" INTEGER NOT NULL,

    CONSTRAINT "PokemonEvolutionInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PowerStatus_pokemonId_key" ON "PowerStatus"("pokemonId");

-- CreateIndex
CREATE UNIQUE INDEX "PokemonCharacteristics_pokemonId_key" ON "PokemonCharacteristics"("pokemonId");

-- CreateIndex
CREATE UNIQUE INDEX "PokemonEvolutionInfo_pokemonId_key" ON "PokemonEvolutionInfo"("pokemonId");

-- AddForeignKey
ALTER TABLE "Pokemon" ADD CONSTRAINT "Pokemon_typePokemonId_fkey" FOREIGN KEY ("typePokemonId") REFERENCES "TypePokemon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeatherPokemon" ADD CONSTRAINT "WeatherPokemon_weatherId_fkey" FOREIGN KEY ("weatherId") REFERENCES "Weather"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeatherPokemon" ADD CONSTRAINT "WeatherPokemon_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("pokedexNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PowerStatus" ADD CONSTRAINT "PowerStatus_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("pokedexNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonCharacteristics" ADD CONSTRAINT "PokemonCharacteristics_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("pokedexNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonEvolutionInfo" ADD CONSTRAINT "PokemonEvolutionInfo_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("pokedexNumber") ON DELETE RESTRICT ON UPDATE CASCADE;
