const router = require('express').Router();

router.get('/', (req, res) => {
    res.send(req.busServices.get('119').get(1));
});

module.exports = router;
