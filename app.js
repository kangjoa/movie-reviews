const express = require('express');
const app = express();
const { engine } = require('express-handlebars');

const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/movie-reviews', { useNewUrlParser: true });
mongoose.connect('mongodb://localhost/movie-reviews');

const Review = mongoose.model('Review', {
  title: String,
  movieTitle: String,
});

app.engine(
  'handlebars',
  engine({ extname: '.handlebars', defaultLayout: 'main' }),
);
app.set('view engine', 'handlebars');

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});

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

// let reviews = [
//   { title: 'Bats are cute.', movieTitle: 'Batman II' },
//   { title: 'Ice is overrated.', movieTitle: 'Titanic' },
// ];
