require('dotenv').config();

// Module Imports
const express = require('express');
const methodOverride = require('method-override');
const { engine } = require('express-handlebars');
const Handlebars = require('handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const allowPrototypeAccess =
  require('@handlebars/allow-prototype-access').allowInsecurePrototypeAccess;

// App and Middleware Configuration
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'));

// Database Connection
mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB...', err));

// View Engine Configuration
app.engine(
  'handlebars',
  engine({
    extname: '.handlebars',
    defaultLayout: 'main',
    handlebars: allowPrototypeAccess(Handlebars),
  }),
);
app.set('view engine', 'handlebars');

// Routes
const reviews = require('./controllers/reviews');
reviews(app);
const comments = require('./controllers/comments');
comments(app);

// Start the Server
app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
