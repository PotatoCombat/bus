const router = require('express').Router();

const { fetchFromLTA } = require('../utils/fetchFromLTA');

let lastResult = undefined;
let lastTimestamp = new Date();

let timeToLive = 10000;

let data = new Map();

router.get('/', async (req, res) => {
    if (lastResult && (new Date() - lastTimestamp) < timeToLive) {
        res.send(lastResult);
        return;
    }
    await fetchFromLTA('https://datamall2.mytransport.sg/ltaodataservice/BusRoutes')
    .then(response => {
        lastTimestamp = new Date(response.headers.get('Date'));
        return response.json();
    })
    .then(json => {
        lastResult = json;
        res.send(json);

        json.value.forEach(x => {
            data.get()
        })
    });
});

module.exports = router;
