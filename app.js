const express = require('express');
const app = express();
const { engine } = require('express-handlebars');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/movie-reviews', {
  useNewUrlParser: true,
});
// mongoose.connect('mongodb://localhost/movie-reviews');

const Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String,
});

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.engine(
  'handlebars',
  engine({ extname: '.handlebars', defaultLayout: 'main' }),
);
app.set('view engine', 'handlebars');

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});

// ROUTES
// INDEX
app.get('/', (req, res) => {
  Review.find()
    .then((reviews) => {
      res.render('reviews-index', { reviews: reviews });
    })
    .catch((err) => {
      console.log(err);
    });
});

// NEW
app.get('/reviews/new', (req, res) => {
  res.render('reviews-new', {});
});

// CREATE
app.post('/reviews', (req, res) => {
  Review.create(req.body)
    .then((review) => {
      console.log(review);
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err.message);
    });
});

// let reviews = [
//   { title: 'Bats are cute.', movieTitle: 'Batman II' },
//   { title: 'Ice is overrated.', movieTitle: 'Titanic' },
// ];
