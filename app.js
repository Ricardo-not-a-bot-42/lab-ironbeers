const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + '/views/partials');

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beers => {
      console.log(beers);
      res.render('beers', { beerList: beers });
    })
    .catch(error => {
      res.send('There was an error displaying the content');
      console.log(error);
    });
});

app.get('/beers/:id', (req, res) => {
  const id = req.params.id;
  punkAPI
    .getBeer(id)
    .then(beer => {
      selectedBeer = beer[0];
      res.render('singleBeer', { beer: selectedBeer });
    })
    .catch(error => {
      res.send('There was an error displaying the content');
      console.log(error);
    });
});

app.get('/random-beers', (req, res) => {
  punkAPI
    .getRandom()
    .then(beer => {
      const randomBeer = beer[0];
      res.render('random-beers', { randomBeer });
    })
    .catch(error => {
      res.send('There was an error displaying the content');
      console.log(error);
    });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
