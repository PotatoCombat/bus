const router = require('express').Router();

const { fetchFromLTA } = require('../utils/fetchFromLTA');

let lastResult = undefined;
let lastTimestamp = new Date();

let timeToLive = 10000;

let data = new Map();

// Define a function called diff_minutes that calculates the difference in minutes between two Date objects (dt2 and dt1)
function diff_minutes(dt1, dt2) 
 {
    var x = new Date(dt1);
    var y = new Date(dt2);
    // Calculate the difference in milliseconds between the two provided dates and convert it to seconds
    var diff =(x.getTime() - y.getTime()) / 1000;
    // Convert the difference from seconds to minutes
    diff /= 60;
    // Return the absolute value of the rounded difference in minutes
    return Math.abs(Math.round(diff));
 }

router.get('/', async (req, res) => {
    if (lastResult && (new Date() - lastTimestamp) < timeToLive) {
        res.send(lastResult);
        return;
    }
    var busStopCode = req.query.BusStopCode;
    await fetchFromLTA('https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=' + busStopCode)
    .then(response => {
        lastTimestamp = new Date(response.headers.get('Date'));
        return response.json();
    })
    .then(json => {
        buses = json.Services;
        timings = [];
        buses.forEach(bus => {
            timings.push({
                ServiceNo : bus.ServiceNo,
                NextBus1 : diff_minutes(new Date(bus.NextBus.EstimatedArrival), lastTimestamp),
                NextBus2 : diff_minutes(new Date(bus.NextBus2.EstimatedArrival), lastTimestamp),
                NextBus3 : diff_minutes(new Date(bus.NextBus3.EstimatedArrival), lastTimestamp)
            });
        });
        lastResult = timings;
        res.send({
            BusStopCode : busStopCode,
            Timings : timings
        });
    });
});

module.exports = router;
