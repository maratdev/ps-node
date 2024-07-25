import {homedir} from 'os'
import {join} from 'path'
import {PathLike, promises} from 'fs'

const filePath = join(homedir(), 'weather.json')

export const TOKEN_DICTIONARY = {
    token: 'token',
    city: 'city',
    lang: 'lang',
}

export const saveKeyValue = async (key: string, value: string): Promise<void> => {
    let data: Record<string, any> = {}
    if (await isExists(filePath)) {
        const file = await promises.readFile(filePath, 'utf8')
        data = JSON.parse(file);
    }
    if (!data.city && key === TOKEN_DICTIONARY.city) {
        data[key] = [value]
    } else if (data.city && key === TOKEN_DICTIONARY.city) {
        if (data.city.includes(value)) {
            throw new Error('Conflict city')
        }
        data[key].push(value)
    } else {
        data[key] = value
    }

    await promises.writeFile(filePath, JSON.stringify(data))
}
export const getKeyValue = async (key: string): Promise<string[] | undefined> => {
    if (await isExists(filePath)) {
        const file = await promises.readFile(filePath, 'utf8')
        const data = JSON.parse(file);
        return data[key]
    }
    return undefined
}

const isExists = async (path: PathLike) => {
    try {
        await promises.stat(path)
        return true
    } catch (err) {
        return false
    }

}