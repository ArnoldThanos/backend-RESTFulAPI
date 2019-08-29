require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const apiRoutes = require('./routes/api-routes');

app.use(bodyParser.urlencoded({
  extended: true,
}));

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err);
  });

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World with Express'));

app.use('/api', apiRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Running RestHub on port ${port}`);
});

module.exports = app;
