const express = require('express');
const app = express();
const { engine } = require('express-handlebars');

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
  res.render('reviews-index', { reviews: reviews });
});

let reviews = [
  { title: 'Bats are cute.', movieTitle: 'Batman II' },
  { title: 'Ice is overrated.', movieTitle: 'Titanic' },
];
