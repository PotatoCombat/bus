const router = require('express').Router();

router.get('/', async (req, res) => {
    let busRoutes = req.busRoutes.get(req.query.ServiceNo);
    if(busRoutes == undefined || null){
        res.status(404).send({
            ErrorMessage: "Bus Service Not Found"
        });
        return;
    }
    if (req.query.Direction) {
        let busService = req.busServices.get(req.query.ServiceNo.toString()).get(req.query.Direction.toString());
        let stopsOfDirection = busRoutes.get(req.query.Direction);
        let busStops = stopsOfDirection.map((x) => req.busStops.get(x.BusStopCode));
        res.send({
            ServiceNo : req.query.ServiceNo,
            Routes : [{
                Origin : req.busStops.get(busService.OriginCode),
                Destination : req.busStops.get(busService.DestinationCode),
                BusStops : busStops
            }]
        });
    } else {
        let routes = [];
        busRoutes.forEach((element, key) => {
            let busService = req.busServices.get(req.query.ServiceNo.toString()).get(key.toString());
            let busStops = element.map((x) => req.busStops.get(x.BusStopCode));
            routes.push({
                Origin : req.busStops.get(busService.OriginCode),
                Destination : req.busStops.get(busService.DestinationCode),
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
