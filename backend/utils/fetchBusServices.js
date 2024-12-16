const fetchAllFromLTA = require('./fetchAllFromLTA');

let database = new Map();

const fetchBusServices = async function () {
    if (database.size === 0) {
        let results = await fetchAllFromLTA('https://datamall2.mytransport.sg/ltaodataservice/BusServices');
        for (let busRoute of results) {
            let busNumber = busRoute['ServiceNo'];
            let busDirection = busRoute['Direction'];

            let busServices = database.get(busNumber) || new Map();

            busServices.set(busDirection, busRoute);
            database.set(busNumber, busServices);
        }
    }
    return database;
}

module.exports = fetchBusServices;
