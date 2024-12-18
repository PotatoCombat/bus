const router = require('express').Router();

router.get('/', async (req, res) => {
    let busRoutes = req.busRoutes.get(req.query.ServiceNo);
    if (req.query.Direction) {
        let stopsOfDirection = busRoutes.get(req.query.Direction);
        let busStops = [];
        stopsOfDirection.forEach(stop =>{
            busStops.push(stop.BusStopCode);
        });

        res.send({
            ServiceNo : req.query.ServiceNo,
            Routes : [{
                OriginCode : stopsOfDirection[0].BusStopCode,
                DestinationCode : stopsOfDirection[stopsOfDirection.length-1].BusStopCode,
                BusStops : busStops
            }]
        });
    } else {
        let routes = [];
        busRoutes.forEach(route => {
            let busStops = [];
            route.forEach(stop => {
                busStops.push(stop.BusStopCode);
            });
            routes.push({
                OriginCode : route[0].BusStopCode,
                DestinationCode : route[route.length-1].BusStopCode,
                BusStops : busStops
            });
        });
        res.send({
            ServiceNo : req.query.ServiceNo,
            Routes : routes
        });
    }
});

module.exports = router;
