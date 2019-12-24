const path = require('path');
const express = require("express");
const hbs = require('hbs');
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

app.use(express.static(path.join(__dirname, '../public')));
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: "Il fait beau",
        name: "Alex Tsypkin"
    });
    
})



app.get('/help', (req, res) => {
    res.render('help', {
        title: "911, hello how can I help you ?",
        name:"Alex Tsypkin"
    });

})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me.",
        name: "Alex Tsypkin"
    });

})



app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: "You must provide the address"
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        

        if (error) {
            return res.send({
                error: error
            })
        }
        

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            

            res.send({
                location,
                forecast: forecastData,
                address: req.query.address

            })
        })


    })


    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error:"You must provide a search term"
        })
    }
    console.log(req.query.search);

    res.send({
        products: []
    })
})



app.get('/help/*', (req, res) => {
    res.render('notfound', {
        errorMessage: "Help article not found",
        name: "Alex Tsypkin"
    })

})

app.get('*', (req, res) => {
    res.render('notfound', {
        errorMessage: "Page not found",
        name: "Alex Tsypkin"
    })

})




app.listen(3000, () => {
    console.log("server started on port 3000");
    name: "Alex Tsypkin"

});