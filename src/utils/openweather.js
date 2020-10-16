const request = require('request')

const openweather = (cityName, callback) => {
    const url = "http://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=metric&appid=a00c6c50508a7540bae2dd44c44501d9"
    request({url, json: true}, (error, response) => {
        if (error) {
            callback ('Something went wrong, maybe check your internet connetion?')
        }else if (response.body.name.length === 0) {
            callback ('Maybe check your spelling?')
        }else {
            callback(undefined, 'Weather: ' + response.body.weather[0].main + ', temperature is ' + response.body.main.temp + ' celsius and wind speed ' + response.body.wind.speed+ ' beufort')
        }

    })
}
module.exports = openweather