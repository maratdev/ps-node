import chalk from 'chalk'
import dedent from "dedent-js";

export const printError = (error) => {
    console.log(chalk.bgRedBright(' ERROR ') + ' ' + error)
}

export const printSuccess = (msg) => {
    console.log(chalk.bgGreenBright(' SUCCESS ') + ' ' + msg)
}

export const printHelp = () => {
    console.log(
        dedent`${chalk.bgBlue(' HELP ')}
            без параметров - вывод погоды
            -s [CITY] для установки города
            -h  для вывода справки
            -е [API_KEY] для установки API_KEY
            -l  установка языка 'ru' или 'en'`)
}

export const printWeatherRu = (res, icon) => {
    const descToUpper= res.weather[0].description.charAt(0).toUpperCase() + res.weather[0].description.slice(1)
    console.log(
        dedent`${chalk.bgYellowBright(' WEATHER ')}
            Погода в городе ${res.name}:
            ${icon} ${descToUpper}
            Влажность: ${res.main.humidity}%
            Скорость ветра: ${res.wind.speed}`
    )
}
export const printWeather = (res, icon) => {
    const descToUpper= res.weather[0].description.charAt(0).toUpperCase() + res.weather[0].description.slice(1)
    console.log(
        dedent`${chalk.bgYellowBright(' WEATHER ')}
            Weather in the city ${res.name}:
            ${icon} ${descToUpper}
            Humidity: ${res.main.humidity}%
            Wind speed: ${res.wind.speed}`
    )
}