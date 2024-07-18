export const printWeather = (res) => {
    const descToUpper= res.weather[0].description.charAt(0).toUpperCase() + res.weather[0].description.slice(1)
    return {
        weatherCity: res.name,
        icon: descToUpper,
        humidity: res.main.humidity,
        windSpeed: res.wind.speed
    }
}
