import {getKeyValue, saveKeyValue, TOKEN_DICTIONARY} from "./services/storage.service.js";
import {getWeather} from "./services/api.service.js";
import {printWeather} from "./services/log.services.js";

export const saveData = async (req, res) => {
    const data = req.body;
    if (!data.city || !data.token) {
        res.status(400).send({error: "Invalid city or token"});
        return
    }
    try {
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                await saveKeyValue(key, data[key])
            }
        }
        res.status(200).send({success: "Save data"})
    } catch (e) {
        if (e?.response?.status === 404) {
            res.status(404).send(e.response.data.message)
        } else if (e?.response?.status === 401) {
            res.status(401).send(e.response.data.message)
        } else {
            res.status(500).send(e.message)
        }
    }
}

export const getForCast = async (req, res) => {
    try {
        const chunk = (arr, size) => Array.from(Array(Math.ceil(arr.length / size)), (el, i) => arr.slice(i * size, i * size + size));
        const cities = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);
        const lang = process.env.LANG ?? await getKeyValue(TOKEN_DICTIONARY.lang);
        if (!cities) {
            res.status(400).send('City is required')
        }
        for (let dataChunk of chunk(cities, 20)) {
            await Promise.all(dataChunk.map(async (city) => {
                const weather = await getWeather(city, lang);
                res.send(printWeather(weather));
            }))
        }

    } catch (e) {
        if (e?.response?.status === 404) {
            res.status(404).send(e.response.data.message)
        } else if (e?.response?.status === 401) {
            res.status(401).send(e.response.data.message)
        } else {
            res.status(500).send(e.message)
        }
    }

}
