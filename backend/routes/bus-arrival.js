const router = require('express').Router();

const { fetchFromLTA } = require('../utils/fetchFromLTA');

// Define a function called diff_minutes that calculates the difference in minutes between two Date objects (dt2 and dt1)
function diff_minutes(dt1) 
 {
    if(dt1 == ''){
        return -1;
    }else{
        let currentTime = new Date();
        var x = new Date(dt1);
        var y = new Date(currentTime);
        // Calculate the difference in milliseconds between the two provided dates and convert it to seconds
        var diff =(x.getTime() - y.getTime()) / 1000;
        // Convert the difference from seconds to minutes
        diff /= 60;
        // Return the absolute value of the rounded difference in minutes
        var mins = Math.abs(Math.round(diff));

        return mins;
    }
    
 }

router.get('/', async (req, res) => {
    var busStopCode = req.query.BusStopCode;
    await fetchFromLTA('https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=' + busStopCode)
    .then(response => {
        return response.json();
    })
    .then(json => {
        buses = json.Services;
        timings = [];
        buses.forEach(bus => {
            timings.push({
                ServiceNo : bus.ServiceNo,
                NextBuses : [
                    diff_minutes(new Date(bus.NextBus.EstimatedArrival)),
                    diff_minutes(new Date(bus.NextBus2.EstimatedArrival)),
                    diff_minutes(new Date(bus.NextBus3.EstimatedArrival))
                ]
            });
        });
        res.send({
            BusStopCode : busStopCode,
            Timings : timings
        });
    });
});

module.exports = router;
