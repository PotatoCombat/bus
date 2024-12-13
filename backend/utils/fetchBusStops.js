const fetchFromLTA = require('./fetchFromLTA');

let database = new Map();

const recordsPerRequest = 500;

const fetchBusStops = async function () {
    if (database.size === 0) {
        let index = 0;
        let finished = false;

        let results = [];
        while (!finished) {
            await fetchFromLTA(`https://datamall2.mytransport.sg/ltaodataservice/BusStops?$skip=${index}`)
                .then(response => response.json())
                .then(json => json['value'])
                .then(records => {
                    results.push(...records);
                    index += recordsPerRequest;
                    finished = records.length <= 0;
                });
        }

        for (let busStop of results) {
            database.set(busStop['BusStopCode'], busStop);
        }
    }
    return database;
}

module.exports = fetchBusStops;
