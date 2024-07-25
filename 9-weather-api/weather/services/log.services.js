const descToUpper = (str) => {
    return str.weather[0].description.charAt(0).toUpperCase() + str.weather[0].description.slice(1)
}
export const printWeather = (res) => {
    return {
        weatherCity: res.name,
        icon: descToUpper(res),
        humidity: res.main.humidity,
        windSpeed: res.wind.speed
    }
}
