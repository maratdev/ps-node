#!/usr/bin/env node
import {getArgs} from './helpers/args.js'
import {printError, printHelp, printSuccess, printWeather, printWeatherRu} from "./services/log.services.js";
import {getKeyValue, saveKeyValue, TOKEN_DICTIONARY} from "./services/storage.service.js";
import {getIcon, getWeather} from "./services/api.service.js";

const saveToken = async (token) => {
    if (!token.length) {
        printError('Token is required');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token)
        printSuccess('Token saved')
    } catch (err) {
        printError(err.message)
    }
}

const saveLang = async (lang) => {
    if (!lang.length) {
        printError('Lang is required');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.lang, lang)
        printSuccess('Lang saved')
    } catch (err) {
        printError(err.message)
    }
}

const saveCity = async (city) => {
    if (!city.length) {
        printError('City is required');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city)
        printSuccess('City saved')
    } catch (err) {
        printError(err.message)
    }
}

const getForCast = async () => {
    try {
        const cities = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);
        const lang = process.env.LANG ?? await getKeyValue(TOKEN_DICTIONARY.lang);
        if (!cities) {
            printError('City is required');
        }
        await Promise.all(cities.map(async (city) => {
            let weather = await getWeather(city, lang);
            if (lang === 'ru' || !lang) {
                return printWeatherRu(weather, getIcon(weather?.weather[0].icon));
            }
            printWeather(weather, getIcon(weather?.weather[0].icon));
        }))
    } catch (e) {
        if (e?.response?.status === 404) {
            printError(e.response.data.message)
        } else if (e?.response?.status === 401) {
            printError(e.response.data.message)
        } else {
           printError(e.message)
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