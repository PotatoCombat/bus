const router = require('express').Router();

router.get('/', async (req, res) => {
    let busRoutes = req.busRoutes.get(req.query.ServiceNo);
    if (req.query.Direction) {
        let busService = req.busServices.get(req.query.ServiceNo.toString()).get(req.query.Direction.toString());
        let stopsOfDirection = busRoutes.get(req.query.Direction);
        let busStops = stopsOfDirection.map((x) =>x.BusStopCode);
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
        busRoutes.forEach((element, key, value) => {
            let busService = req.busServices.get(req.query.ServiceNo.toString()).get(key.toString());
            let busStops = element.map((x) =>x.BusStopCode);
            routes.push({
                OriginCode : busService.OriginCode,
                DestinationCode : busService.DestinationCode,
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
