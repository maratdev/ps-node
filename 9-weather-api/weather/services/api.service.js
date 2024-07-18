import {getKeyValue, TOKEN_DICTIONARY} from "./storage.service.js";
import axios from "axios";

const API_WEATHER = "https://api.openweathermap.org/data/2.5/weather"

export const getWeather = async (city, lang = 'en') => {
    const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token)
    if (!token) {
        throw new Error('Не удалось получить токен')
    }
    const {data} = await axios.get(API_WEATHER, {
        params: {
            q: city,
            appid: token,
            lang: lang,
            units: 'metric'
        }
    })
    return data
}