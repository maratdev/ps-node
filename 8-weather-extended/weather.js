#!/usr/bin/env node
import {getArgs} from './helpers/args.js'
import {printError, printHelp, printSuccess, printWeather} from "./services/log.services.js";
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
        const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);

        city.map(async (city) => {
            let weather = await getWeather(city);
            printWeather(weather, getIcon(weather.weather[0].icon));
        })

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
    const {h, s, t} = getArgs(process.argv);
    if (h) {
        return printHelp()
    }
    if (s) {
        return saveCity(s)
    }
    if (t) {
        return saveToken(t)
    }
    return getForCast()
}
initCLI();