const express = require('express')
const path = require('path')
const openweather = require('./utils/openweather')
const mapboxLocation = require('./utils/mapboxlocation')

const app = express()
const port = process.env.PORT || 3000


const staticDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(staticDirectoryPath))

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'error'
        })
    }
    mapboxLocation(req.query.address, (error, mpldata) => {
        openweather(mpldata, (error, weatherdata) => {
            console.log(mpldata, weatherdata)
            res.send({
                address: mpldata,
                forecast: weatherdata
            })
        })
    })
})

app.get('/about', (req, res) => {
    res.sendFile(staticDirectoryPath+'/about.html')
})

app.get('/home', (req, res) => {
    res.sendFile(staticDirectoryPath+'/index.html')
})


app.get('*', (req, res) =>{
    res.send('404 page')
})

app.listen(port, () => {
    console.log('Server running on port '+port)
})