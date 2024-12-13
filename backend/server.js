const express = require('express');

const cors = require('cors');
const dotenv = require('dotenv');

const { fetchBusStops, fetchBusRoutes } = require('./utils');

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
  req.busRoutes = await fetchBusRoutes();
  next();
});

// Server routes
app.use('/example', require('./routes/example'));
app.use('/bus-route', require('./routes/bus-route'));
app.use('/bus-arrival', require('./routes/bus-arrival'));

// Server ready
app.listen(process.env.PORT, () => {
  console.log(`LGBT listening on port ${process.env.PORT}`)
});
