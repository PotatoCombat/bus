const router = require('express').Router();

router.get('/', (req, res) => {
    res.send(`[Server Ready]`);
});

module.exports = router;
