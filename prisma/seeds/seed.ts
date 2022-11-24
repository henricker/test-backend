
import { execSync } from 'child_process';
import { PrismaClient } from '@prisma/client'
import { pipeline } from 'stream/promises';
import { createReadStream } from 'fs';
import csvtojson from 'csvtojson'

(async () => {
    const prisma = new PrismaClient()

    const types = await prisma.typePokemon.findMany();
    const weathers = await prisma.weather.findMany();

    async function * createPokemon(stream: any) {
        for await(const chunk of stream) {

            const rows = chunk.toString().split('\n')
            rows.forEach(async (row: string) => {
            if(!row) return;
            const rowJSON = JSON.parse(row)

            const characterist = await prisma.pokemonCharacteristics.create({
                data: {
                    aquireable: Number(rowJSON['Aquireable'] ?? 0),
                    crossGen: Boolean(rowJSON['Cross Gen'] ?? 0),
                    futureEvolve: Boolean(rowJSON['Future Evolve'] ?? 0),
                    NotGettable: Boolean(rowJSON['Not-Gettable'] ?? 0),
                    new: Boolean(rowJSON['New'] ?? 0),
                    regional: Boolean(rowJSON['Regional'] ?? 0),
                    raidable: Number(rowJSON['Raidable'] ?? 0),
                    generation: Number(rowJSON['Generation'] ?? 0),
                    hatchable: Number(rowJSON['Hatchable'] ?? 0),
                    shiny: Boolean(rowJSON['Shiny'] ?? 0),
                    legendary: Boolean(rowJSON['Legendary'] ?? 0),
                    nest: Boolean(rowJSON['Nest'] ?? 0),
                    spawns: Boolean(rowJSON['Spawns'] ?? 0),
                }
            })

            const evolutionInfo = await prisma.pokemonEvolutionInfo.create({
                data: {
                familyId: Number(rowJSON['FamilyID'] ?? 0),
                envolved: Boolean(rowJSON['Evolved'] ?? 0),
                evolutionStage: isNaN(Number(rowJSON['Evolution Stage'])) ? 0 : Number(rowJSON['Evolution Stage']),
                }
            })

            const powerStatus = await prisma.powerStatus.create({
                data: {
                    atk: Number(rowJSON['ATK'] ?? 0),
                    def: Number(rowJSON['DEF'] ?? 0),
                    sta: Number(rowJSON['STA'] ?? 0),
                    statTotal: Number(rowJSON['STAT TOTAL']  ?? 0),
                    cp_100_39: Number(rowJSON['100% CP @ 39'] ?? 0),
                    cp_100_40: Number(rowJSON['100% CP @ 40'] ?? 0),
                }
            })

            const typesPokemon =  [
                    {
                        typePokemonId: Number(types.find(type => type.name === rowJSON['Type 1'])?.id)
                    },
                    {
                        typePokemonId: Number(types.find(type => type.name === rowJSON['Type 2'])?.id)
                    }
                ].filter(type => !isNaN(type.typePokemonId))

            const weathersPokemon =  [
                {
                    weatherId: Number(weathers.find(weather => weather.name === rowJSON['Weather 1'])?.id)
                },
                {
                    weatherId: Number(weathers.find(weather => weather.name === rowJSON['Weather 2'])?.id)
                }
            ].filter(weather => !isNaN(weather.weatherId))


            await prisma.pokemon.create({
                data: {
                    powerStatusId: powerStatus.id,
                    pokemonEvolutionInfoId: evolutionInfo.id,
                    pokemonCharacteristicsId: characterist.id,
                    pokedexNumber: Number(rowJSON['Row']),
                    PokemonTypePokemon: {
                        createMany: {
                            data: typesPokemon
                        }
                    },
                    PokemonWeather: {
                        createMany: {
                            data: weathersPokemon
                        }
                    }
        
                }
            })
            
        })
        yield chunk;
    }
}

    if (types.length === 0) {
        // POPULATE TYPEPOKEMON TABLE
        const types = execSync(`cat /usr/src/app/docs/Pokemon_Go.csv | awk -F, '{print $10}'`).toString('utf-8').split('\n')
        types.shift()

        const uniqueTypes = Array.from(new Set(types).values())
        uniqueTypes.pop()

        uniqueTypes.forEach(async type => {
            await prisma.typePokemon.create({
                data: {
                    name: type as string
                }
            })
        })
    }

    if (weathers.length === 0) {
        // POPULATE POKEMON WEATHER TABLE
        const weathers = execSync(`cat /usr/src/app/docs/Pokemon_Go.csv | awk -F, '{print $12}'`).toString('utf-8').split('\n')
        weathers.shift()

        const uniqueWeathers = Array.from(new Set(weathers).values())
        weathers.pop()

        uniqueWeathers.forEach(async weather => {
            await prisma.weather.create({
                data: {
                    name: weather as string
                }
            })
        })
    }

    // POPULATE POKEMON TABLE AND AUXILIAR TABLES
    const pokeCount = await  prisma.pokemon.count()

    if(pokeCount === 0) {
        try {
            await pipeline(
                createReadStream('/usr/src/app/docs/Pokemon_Go.csv'),
                csvtojson(),
                createPokemon,
            )
        } catch(err) {
            console.log(err)
        }
    }
})()