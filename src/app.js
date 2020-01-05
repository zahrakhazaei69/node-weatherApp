const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geoCode = require('./utils/geoCode');
const forecast = require('./utils/forecast');

const app = express();

//define path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../template/views');
const partialsPath = path.join(__dirname, '../template/partials');

//setup static directiory to serve
app.use(express.static(publicDirectoryPath));

//setup handlebars and path view
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Index page',
        name: 'zahra khazaei'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about page',
        name: 'zahra khazaei'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help Page',
        name: 'zahra khazaei'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'No address, please select a valid address'
        });
    }
    geoCode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if(error){
            return res.send({
                error: 'there is some err occured via geocode'
            });    
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error: 'there is some error occured via forecast'
                });
            }
            res.send({
                location,
                forecast: forecastData
            });
        });  
    });
});

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'there is no search query'
        });
    }
    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'zahra khazaei',
        errorMessage: 'help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'zahra khazaei',
        errorMessage: 'page not found'
    });
});

app.listen(3000, () => {
    console.log('server is listening on port 3000');
})

