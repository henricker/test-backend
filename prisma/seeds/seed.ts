import { PrismaClient } from '@prisma/client'
import { execSync } from 'child_process';

const prisma = new PrismaClient()

// POPULATE TYPEPOKEMON TABLE
const types = execSync(`cat /usr/src/app/docs/Pokemon_Go.csv | awk -F, '{print $10}'`).toString('utf-8').split('\n')
types.shift()

const uniqueTypes = Array.from(new Set(types).values())
uniqueTypes.pop()


uniqueTypes.forEach(async type => {
    await prisma.typePokemon.create({
        data: {
            name: type
        }
    })
})

// POPULATE POKEMON WEATHER TABLE
const weathers = execSync(`cat /usr/src/app/docs/Pokemon_Go.csv | awk -F, '{print $12}'`).toString('utf-8').split('\n')
weathers.shift()

const uniqueWeathers = Array.from(new Set(weathers).values())

uniqueWeathers.forEach(async weather => {
    await prisma.weather.create({
        data: {
            name: weather
        }
    })
})



