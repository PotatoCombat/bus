const express = require('express');

const cors = require('cors');
const dotenv = require('dotenv');

const { fetchBusRoutes, fetchBusServices, fetchBusStops } = require('./utils');

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
  req.busRoutes = await fetchBusRoutes();
  req.busServices = await fetchBusServices();
  req.busStops = await fetchBusStops();
  next();
});

// Server routes
app.use('/example-bus-routes', require('./routes/example-bus-routes'));
app.use('/example-bus-services', require('./routes/example-bus-services'));
app.use('/example-bus-stops', require('./routes/example-bus-stops'));
app.use('/ready', require('./routes/ready'));
app.use('/BusStop', require('./routes/bus-stop'));
app.use('/BusRoute', require('./routes/bus-route'));
app.use('/BusArrival', require('./routes/bus-arrival'));

// Server ready
app.listen(process.env.PORT, async () => {
  await fetch(`http://localhost:${process.env.PORT}/ready`)
    .then(response => response.text())
    .then(text => console.log(`LGBT listening on port ${process.env.PORT}`))
    .catch(error => console.error(`LGBT failed to start on port ${process.env.PORT}:`, error))
});
