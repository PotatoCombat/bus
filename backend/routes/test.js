const router = require('express').Router();

router.get('/', (req, res) => {
    // res.send(req.busStops.get("83139"));
    // res.send(req.busRoutes.get(("100", 1)));
    res.send('test');
});

module.exports = router;
