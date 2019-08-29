require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const laboratoriosRoutes = require('./routes/laboratorios-routes');
const examesRoutes = require('./routes/exames-routes');
const associateRoutes = require('./routes/associate-routes')

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

app.use('/api', laboratoriosRoutes);
app.use('/api', examesRoutes);
app.use('/api', associateRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Running RestHub on port ${port}`);
});

module.exports = app;
