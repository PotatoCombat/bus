const router = require('express').Router();

router.get('/', async (req, res) => {
    let busRoutes = req.busRoutes.get(req.query.ServiceNo);
    if (req.query.Direction) {
        let busService = req.busServices.get(req.query.ServiceNo.toString()).get(req.query.Direction.toString());
        let stopsOfDirection = busRoutes.get(req.query.Direction);
        let busStops = [];
        stopsOfDirection.forEach(stop =>{
            busStops.push(stop.BusStopCode);
        });
        
        res.send({
            ServiceNo : req.query.ServiceNo,
            Routes : [{
                OriginCode : busService.OriginCode,
                DestinationCode : busService.DestinationCode,
                BusStops : busStops
            }]
        });
    } else {
        let routes = [];
        let direction = 1;
        busRoutes.forEach(route => {
            let busStops = [];
            let busService = req.busServices.get(req.query.ServiceNo.toString()).get(direction.toString());
            route.forEach(stop => {
                busStops.push(stop.BusStopCode);
            });
            routes.push({
                OriginCode : busService.OriginCode,
                DestinationCode : busService.DestinationCode,
                BusStops : busStops
            });
            direction++;
        });
        res.send({
            ServiceNo : req.query.ServiceNo,
            Routes : routes
        });
    }
});

module.exports = router;
