const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode')
const foreCast = require('./utils/forecast')

const app = express();

const indexPath = path.join(__dirname, '../assets')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

app.use(express.static(indexPath));

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Andrew Mead'
    });
})
app.get('/weather', (req, res) => {
    let address = req.query.address
    if (!address) {
        return res.send({ error: 'No Address found' })
    }
    geoCode(address, (error, { latitude, longitude, location }={}) => {
        if(error){
            return res.send({error:'GeoCode Error'})
        }   
        foreCast(latitude,longitude,(error,response)=>{
            if(error){
                // return res.render('error',{err:'Forecasting Error'});
                return res.send({error:'Forecasting Error'})
            }
            // return res.render('weatherReport',{response,location});
            return res.send({response,location})
        })
    })
    // res.send({ address: address })
})
app.get('/weather/*', (req, res) => {
    res.render('gotoweather', { text: 'Go to Weather Page', link: '/weather' })
})
app.get('*', (req, res) => {
    res.send('My 404')
})
app.listen(3000, () => {
    console.log('Serer running on port 3k')
})
