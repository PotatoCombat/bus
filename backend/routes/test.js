const router = require('express').Router();

router.get('/', (req, res) => {
    res.send(req.busStops.get("83139"));
});

module.exports = router;
