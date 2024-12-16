const router = require('express').Router();

router.get('/', async (req, res) => {
    let busRoutes = req.busRoutes.get(req.query.ServiceNo);
    if (req.query.Direction) {
        res.send(busRoutes.get(req.query.Direction));
    } else {
        let results = [];
        busRoutes.forEach((busRoute, direction) => {
            results.push(busRoute);
        });
        res.send(results);
    }
});

module.exports = router;
