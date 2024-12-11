const express = require('express');

const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Allow requests only from our frontend
app.use(cors({
  origin: process.env.FRONTEND,
  methods: ['GET'],
}));

// Home
app.get('/', (req, res) => {
  res.send('Welcome to Letz Get Bus Timings')
});

// Add API KEY for all requests
app.use(function (req, res, next) {
  req.headers['AccountKey'] = process.env.ACCOUNT_KEY;
  next();
});

// Server routes
app.use('/bus-route', require('./routes/bus-route'));

// Server ready
app.listen(process.env.PORT, () => {
  console.log(`LGBT listening on port ${process.env.PORT}`)
});
