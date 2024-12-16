const fetchAllFromLTA = require('./fetchAllFromLTA');

let database = new Map();

const fetchBusRoutes = async function () {
    if (database.size === 0) {
        let results = await fetchAllFromLTA('https://datamall2.mytransport.sg/ltaodataservice/BusRoutes');
        for (let busStop of results) {
            let busNumber = busStop['ServiceNo'];
            let busDirection = busStop['Direction'];

            let busRoutes = database.get(busNumber) || new Map();
            let busRoute = busRoutes.get(busDirection) || [];

            busRoute.push(busStop);
            busRoutes.set(busDirection, busRoute);
            database.set(busNumber, busRoutes);
        }
    }
    return database;
}

module.exports = fetchBusRoutes;
