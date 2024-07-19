import chalk from 'chalk'
import dedent from "dedent-js";


interface Weather {
    weather: { description: string; } [];
    name: string;
    main: { humidity: number; };
    wind: { speed: number; };
}


export const printError = (error: string) => {
    console.log(chalk.bgRedBright(' ERROR ') + ' ' + error)
}

export const printSuccess = (msg: string) => {
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

export const printWeatherRu = (res: Weather, icon: string | undefined) => {
    const descToUpper = res.weather[0].description.charAt(0).toUpperCase() + res.weather[0].description.slice(1)
    console.log(
        dedent`${chalk.bgYellowBright(' WEATHER ')}
            Погода в городе ${res.name}:
            ${icon} ${descToUpper}
            Влажность: ${res.main.humidity}%
            Скорость ветра: ${res.wind.speed}`
    )
}
export const printWeather = (res: Weather, icon: string | undefined) => {
    const descToUpper = res.weather[0].description.charAt(0).toUpperCase() + res.weather[0].description.slice(1)
    console.log(
        dedent`${chalk.bgYellowBright(' WEATHER ')}
            Weather in the city ${res.name}:
            ${icon} ${descToUpper}
            Humidity: ${res.main.humidity}%
            Wind speed: ${res.wind.speed}`
    )
}