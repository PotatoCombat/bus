const router = require('express').Router();

router.get('/', (req, res) => {
    res.send([
        req.busRoutes.get('100').get(1),
        req.busRoutes.get('100').get(2)
    ]);
});

module.exports = router;