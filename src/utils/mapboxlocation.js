const { response } = require('express')
const request = require('request')

const mapboxLocation = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYWxrb24tIiwiYSI6ImNrZzljZGo4bzBqNmMycW15anZhN2Z2bWQifQ.F4jZkNqzY6xf8PA-NW10fA&limit=3'

    request({url, json: true}, (error, response) => {
        if (error) {
            callback ('Something went wrong, maybe check your internet connetion?')
        }else if (response.body.features.length === 0) {
            callback ('Maybe check your spelling?')
        }else {
            callback(undefined, response.body.features[0].place_name)
        }
    })
}
module.exports = mapboxLocation