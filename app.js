const express = require('express');
const app = express();
const { engine } = require('express-handlebars');

app.engine(
  'handlebars',
  engine({ extname: '.handlebars', defaultLayout: 'main' }),
);
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('home', { msg: 'Handlebars are Cool!' });
});

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
