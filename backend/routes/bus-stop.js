const router = require('express').Router();

router.get('/', (req, res) => {
    let busStopCode = req.query.BusStopCode;
    let busStop = req.busStops.get(busStopCode.toString());
    if(busStop == undefined || busStop == null){
        res.status(404).send({
            ErrorMessage: "Bus Service Not Found"
        });
        return;
    }
    res.send(busStop);
});

module.exports = router;