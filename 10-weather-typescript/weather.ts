#!/usr/bin/env node
import {getArgs} from './helpers/args.js'
import {printError, printHelp, printSuccess, printWeather, printWeatherRu} from "./services/log.services.js";
import {getKeyValue, saveKeyValue, TOKEN_DICTIONARY} from "./services/storage.service.js";
import {getIcon, getWeather} from "./services/api.service.js";
import {AxiosError} from "axios";

const saveToken = async (token: string) => {
    if (!token.length) {
        printError('Token is required');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token)
        printSuccess('Token saved')
    } catch (err) {
        if (err instanceof Error) {
            printError(err.message)
        }
    }
}

const saveLang = async (lang: string) => {
    if (!lang.length) {
        printError('Lang is required');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.lang, lang)
        printSuccess('Lang saved')
    } catch (err) {
        if (err instanceof Error) {
            printError(err.message)
        }
    }
}

const saveCity = async (city: string) => {
    if (!city.length) {
        printError('City is required');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city)
        printSuccess('City saved')
    } catch (err) {
        if (err instanceof Error) {
            printError(err.message)
        }
    }
}

const getForCast = async () => {
    try {
        const chunk = (arr: string[], size: number) => Array.from(Array(Math.ceil(arr.length / size)), (i) => arr.slice(i * size, i * size + size));
        const cities=  process.env.CITY ??await getKeyValue(TOKEN_DICTIONARY.city);
        const lang = process.env.LANG ?? await getKeyValue(TOKEN_DICTIONARY.lang);
        if (!cities) {
            printError('City is required');
        }
        if (Array.isArray(cities) && cities.length) {
            for (let dataChunk of chunk(cities, 20)) {
                await Promise.all(dataChunk.map(async (city: string) => {
                    const weather = await getWeather(city, <string>lang);
                    if (lang === 'ru' || !lang) {
                        return printWeatherRu(weather, getIcon(weather.weather[0].icon));
                    }
                    printWeather(weather, getIcon(weather.weather[0].icon));
                }))

            }
        }

    } catch (err) {
        if (err instanceof AxiosError) {
            if (err?.response?.status === 404) {
                printError(err.response.data.message)
            } else if (err?.response?.status === 401) {
                printError(err.response.data.message)
            } else {
                printError(err.message)
            }
        }

    }

}
const initCLI = () => {
    const {h, s, t, l} = getArgs(process.argv);
    if (h) {
        return printHelp()
    }
    if (s) {
        return saveCity(s)
    }
    if (t) {
        return saveToken(t)
    }
    if (l) {
        return saveLang(l)
    }
    return getForCast()
}
initCLI();