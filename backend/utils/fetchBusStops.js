const { fetchFromLTA } = require('./fetchFromLTA');

let database = new Map();

const recordsPerRequest = 500;

async function fetchBusStops() {
    if (database.size === 0) {
        let index = 0;
        let finished = false;
        while (!finished) {
            await fetchFromLTA(`https://datamall2.mytransport.sg/ltaodataservice/BusStops?$skip=${index}`)
                .then(response => response.json())
                .then(json => json['value'])
                .then(busStops => {
                    for (let busStop of busStops) {
                        database.set(busStop['BusStopCode'], busStop);
                    }
                    index += recordsPerRequest;
                    finished = busStops.length <= 0;
                });
        }
    }
    return database;
}

module.exports = {
    fetchBusStops
}
