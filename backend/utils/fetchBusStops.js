const fetchAllFromLTA = require('./fetchAllFromLTA');

let database = new Map();

const fetchBusStops = async function () {
    if (database.size === 0) {
        let results = await fetchAllFromLTA('https://datamall2.mytransport.sg/ltaodataservice/BusStops');
        for (let busStop of results) {
            database.set(busStop['BusStopCode'], busStop);
        }
    }
    return database;
}

module.exports = fetchBusStops;
