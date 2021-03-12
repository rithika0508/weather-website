const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');

const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast');



const templatePath = path.join(__dirname, '../templates/views');
const partialspath = path.join(__dirname, '../templates/partials');


hbs.registerPartials(partialspath);

app.set('view engine', 'hbs');
app.set('views', templatePath);
app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'rithika',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'rithika',
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        msg: 'This is some helpful text',
        name: 'rithika',
        title: 'Help'
    })
})



app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'address must be provided',
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, place} = {} = {}) => {
        if(error) {
            return res.send({
                error: error,
            });
        }
        forecast(latitude, longitude, (err, forecastdata) => {
            if(err) {
                return res.send({
                    error:err,
                })
            }
            
            res.send([{
                location: place,
                forecast: forecastdata,
                address: req.query.address,
            }]);
        })
    })
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search',
        })
    }
    
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'help 404 page',
        name: 'Rithika',
        errmsg: 'help article not found'
    });
})

app.get('*', (req, res) => {   
    res.render('404', {
        title: '404 page',
        name: 'rithika',
        errmsg: 'Page not found'
    });
})


app.listen(3000, () => {
    console.log('Server is up on port 3000');
})