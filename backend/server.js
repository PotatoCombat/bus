const express = require('express');

const cors = require('cors');
const dotenv = require('dotenv');

const { fetchBusStops } = require('./utils');

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

app.use(async (req, res, next) => {
  req.busStops = await fetchBusStops();
  next();
});

// Server routes
app.use('/test', require('./routes/test'));
app.use('/bus-route', require('./routes/bus-route'));

// Server ready
app.listen(process.env.PORT, () => {
  console.log(`LGBT listening on port ${process.env.PORT}`)
});
