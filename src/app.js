// an express server
const path = require('path');
const express = require('express'); // this returns a function
const hbs = require('hbs');
const app = express();
const geoCode = require('./utils/geoCode');
const getWeather = require('./utils/forecast');

//console.log(path.join(__dirname, '../public'));
const viewsPath = path.join(__dirname, '../template/views');
const partialsPath = path.join(
  __dirname,
  '../template/partials'
);

//set up hbs: which is handlebars
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// routing to a static public directory
app.use(express.static(path.join(__dirname, '../public'))); // serving up a static file to the root route

// setting the route for the handlebar views
app.get('', (req, res) => {
  // render allows to render a view like hbs: handlebar
  res.render('index', {
    // do not include the file extendion for the file being served
    title: 'Weather App',
    name: 'Sarovar'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Sarovar'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is a helpful page',
    title: 'Help',
    name: 'Sarovar'
  });
});
app.get('/weather', (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res.send({
      error: 'You must provide and address'
    });
  }

  geoCode(address, (error, response) => {
    if (!error) {
      const location = response.location;
      return getWeather(
        response.latitude,
        response.longitude,
        (error, response) => {
          if (!error) {
            return res.send({
              forecast: response,
              location,
              address
            });
          }
          return res.send({
            error: error
          });
        }
      );
    }
    res.send({
      error: error
    });
  });
});

// query strings
app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    });
  }
  res.send({
    products: []
  });
});

// * means matching to any route
app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Help Article not found',
    name: 'Sarovar'
  });
});

// match every route
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Page not found',
    name: 'Sarovar'
  });
});

/*
 app.get('/', (req, res) => { // root route
  console.log(req.url);
   res.send('<h1>Hello</h1>');
 });
app.get('/help', (req, res) => {
  // the express automatically stringfies the response object
  res.send({
    name: 'Sarovar',
    skil: 'Web dev'
  });
});
app.get('/about', (req, res) => {
  res.send('<h2>About</h2>');
});
*/

app.listen(3000, () => {
  console.log('Server running...');
});
