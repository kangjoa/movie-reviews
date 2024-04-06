const express = require('express');
const methodOverride = require('method-override');
const app = express();
const { engine } = require('express-handlebars');
const Handlebars = require('handlebars');
const allowPrototypeAccess =
  require('@handlebars/allow-prototype-access').allowInsecurePrototypeAccess;

const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/movie-reviews', {
//   useNewUrlParser: true,
// });

mongoose.connect('mongodb://localhost/movie-reviews');

// const Review = mongoose.model('Review', {
//   title: String,
//   description: String,
//   movieTitle: String,
// });

const bodyParser = require('body-parser');

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({ extended: true }));

const reviews = require('./controllers/reviews')(app);

app.engine(
  'handlebars',
  engine({
    extname: '.handlebars',
    defaultLayout: 'main',
    handlebars: allowPrototypeAccess(Handlebars),
  }),
);
app.set('view engine', 'handlebars');

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
