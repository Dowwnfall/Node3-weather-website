const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/weatherStack');
const geocode = require('./utils/geocode');

const app = express();

const port = process.env.PORT || 3000;
// define express paths
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials')
// setup handelbars engine and views location
app.set('view engine', "hbs");
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)
// Setup static directory to serve

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title:'Weather',
    name:'Andrew Mead'
  });
})
app.get('/help', (req, res) => {
  res.render('help', {
    helpText:'this is some help text',
    title:'Weather',
    name:'Andrew Mead'
  })
});

app.get('/about', (req, res) => {
  res.render('about', {
    title:'About Me',
    name:'Andrew Mead'
  })
});

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({
      error:'you must provide an address'
    });
  }
  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({error:error});
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({error:error});
      }
      res.send({
        forcast:forecastData,
        location,
        address:req.query.address,
      });
    })
  })
});

app.get('/product', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error:'you much provide a search term!'
    });
  }
  res.send({
    products:[]
  });
});




app.get('/help/*', (req, res) => {
  res.render('404', {
    title:'404 help',
    name:'Andrew Mead',
    errorMessage:'Help artical not found.'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title:'404',
    name:'Andrew Mead',
    errorMessage:'Page not found.'
  })
})

app.listen(port, () => {
  console.log('server is up on port' + port);
})
