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
CREATE TABLE "Type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Weather" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Weather_pkey" PRIMARY KEY ("id")
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

-- CreateTable
CREATE TABLE "_PokemonToType" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_PokemonToWeather" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PokemonToType_AB_unique" ON "_PokemonToType"("A", "B");

-- CreateIndex
CREATE INDEX "_PokemonToType_B_index" ON "_PokemonToType"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PokemonToWeather_AB_unique" ON "_PokemonToWeather"("A", "B");

-- CreateIndex
CREATE INDEX "_PokemonToWeather_B_index" ON "_PokemonToWeather"("B");

-- AddForeignKey
ALTER TABLE "Pokemon" ADD CONSTRAINT "Pokemon_pokemonEvolutionInfoId_fkey" FOREIGN KEY ("pokemonEvolutionInfoId") REFERENCES "PokemonEvolutionInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pokemon" ADD CONSTRAINT "Pokemon_pokemonCharacteristicsId_fkey" FOREIGN KEY ("pokemonCharacteristicsId") REFERENCES "PokemonCharacteristics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pokemon" ADD CONSTRAINT "Pokemon_powerStatusId_fkey" FOREIGN KEY ("powerStatusId") REFERENCES "PowerStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PokemonToType" ADD CONSTRAINT "_PokemonToType_A_fkey" FOREIGN KEY ("A") REFERENCES "Pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PokemonToType" ADD CONSTRAINT "_PokemonToType_B_fkey" FOREIGN KEY ("B") REFERENCES "Type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PokemonToWeather" ADD CONSTRAINT "_PokemonToWeather_A_fkey" FOREIGN KEY ("A") REFERENCES "Pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PokemonToWeather" ADD CONSTRAINT "_PokemonToWeather_B_fkey" FOREIGN KEY ("B") REFERENCES "Weather"("id") ON DELETE CASCADE ON UPDATE CASCADE;
