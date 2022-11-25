import { execSync } from 'child_process';
import { PrismaClient } from '@prisma/client';
import { pipeline } from 'stream/promises';
import { createReadStream } from 'fs';
import csvtojson from 'csvtojson';

(async () => {
  const prisma = new PrismaClient();

  function createPokemon(types: any, weathers: any) {
    return async function* iterator(stream: any) {
      for await (const chunk of stream) {
        const rows = chunk.toString().split('\n');

        rows.forEach(async (row: string) => {
          if (!row) return;
          const rowJSON = JSON.parse(row);

          const characterist = await prisma.pokemonCharacteristics.create({
            data: {
              aquireable: Number(rowJSON.Aquireable ?? 0),
              crossGen: Boolean(rowJSON['Cross Gen'] ?? 0),
              futureEvolve: Boolean(rowJSON['Future Evolve'] ?? 0),
              NotGettable: Boolean(rowJSON['Not-Gettable'] ?? 0),
              new: Boolean(rowJSON.New ?? 0),
              regional: Boolean(rowJSON.Regional ?? 0),
              raidable: Number(rowJSON.Raidable ?? 0),
              generation: Number(rowJSON.Generation ?? 0),
              hatchable: Number(rowJSON.Hatchable ?? 0),
              shiny: Boolean(rowJSON.Shiny ?? 0),
              legendary: Boolean(rowJSON.Legendary ?? 0),
              nest: Boolean(rowJSON.Nest ?? 0),
              spawns: Boolean(rowJSON.Spawns ?? 0),
            },
          });

          const evolutionInfo = await prisma.pokemonEvolutionInfo.create({
            data: {
              familyId: Number(rowJSON.FamilyID ?? 0),
              envolved: Boolean(rowJSON.Evolved ?? 0),
              evolutionStage: Number.isNaN(Number(rowJSON['Evolution Stage']))
                ? 0
                : Number(rowJSON['Evolution Stage']),
            },
          });

          const powerStatus = await prisma.powerStatus.create({
            data: {
              atk: Number(rowJSON.ATK ?? 0),
              def: Number(rowJSON.DEF ?? 0),
              sta: Number(rowJSON.STA ?? 0),
              statTotal: Number(rowJSON['STAT TOTAL'] ?? 0),
              cp_100_39: Number(rowJSON['100% CP @ 39'] ?? 0),
              cp_100_40: Number(rowJSON['100% CP @ 40'] ?? 0),
            },
          });

          const typesPokemon = [
            {
              id: Number(
                types.find((t) => t.name === rowJSON['Type 1'].trim())?.id
              ),
            },
            {
              id: Number(
                types.find((t) => t.name === rowJSON['Type 2'].trim())?.id
              ),
            },
          ].filter((t) => !Number.isNaN(t.id));

          const weathersPokemon = [
            {
              id: Number(
                weathers.find((w) => w.name === rowJSON['Weather 1'].trim())?.id
              ),
            },
            {
              id: Number(
                weathers.find((w) => w.name === rowJSON['Weather 2'].trim())?.id
              ),
            },
          ].filter((weather) => !Number.isNaN(weather.id));

          await prisma.pokemon.create({
            data: {
              name: rowJSON.Name,
              powerStatusId: powerStatus.id,
              pokemonEvolutionInfoId: evolutionInfo.id,
              pokemonCharacteristicsId: characterist.id,
              pokedexNumber: Number(rowJSON['Pokedex Number'] ?? 0),
              weather: {
                connect: weathersPokemon,
              },
              type: {
                connect: typesPokemon,
              },
            },
            include: {
              type: true,
              weather: true,
            },
          });
        });
        yield chunk;
      }
    };
  }

  let types = await prisma.type.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  let weathers = await prisma.weather.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  if (types.length === 0) {
    // POPULATE TYPEPOKEMON TABLE
    const typesPokemon = execSync(
      // eslint-disable-next-line quotes
      "cat /usr/src/app/docs/Pokemon_Go.csv | awk -F, '{print $10}'"
    )
      .toString('utf-8')
      .split('\n');
    typesPokemon.shift();

    const uniqueTypes = Array.from(new Set(typesPokemon).values()).filter(
      (v) => v
    );

    await Promise.all(
      uniqueTypes.map(async (type) => {
        await prisma.type.create({
          data: {
            name: type,
          },
        });
      })
    );
  }

  if (weathers.length === 0) {
    // POPULATE POKEMON WEATHER TABLE
    const weathersPokemon = execSync(
      // eslint-disable-next-line quotes
      "cat /usr/src/app/docs/Pokemon_Go.csv | awk -F, '{print $12}'"
    )
      .toString('utf-8')
      .split('\n');
    weathersPokemon.shift();
    const uniqueWeathers = Array.from(new Set(weathersPokemon).values()).filter(
      (v) => v
    );

    await Promise.all(
      uniqueWeathers.map(async (weather) => {
        await prisma.weather.create({
          data: {
            name: weather,
          },
        });
      })
    );
  }

  types = await prisma.type.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  weathers = await prisma.weather.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  // POPULATE POKEMON TABLE AND AUXILIAR TABLES
  const pokeCount = await prisma.pokemon.count();

  if (pokeCount === 0) {
    try {
      await pipeline(
        createReadStream('/usr/src/app/docs/Pokemon_Go.csv'),
        csvtojson(),
        createPokemon(types, weathers)
      );
    } catch (err) {
      console.log(err);
    }
  }
})();
