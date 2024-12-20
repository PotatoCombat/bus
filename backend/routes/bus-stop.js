const router = require('express').Router();

router.get('/', (req, res) => {
    let busStopCode = req.query.BusStopCode;
    console.log(busStopCode);
    res.send(req.busStops.get(busStopCode.toString()));
});

module.exports = router;