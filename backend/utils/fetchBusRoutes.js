const fetchFromLTA = require('./fetchFromLTA');

let database = new Map();

const recordsPerRequest = 500;

const fetchBusRoutes = async function () {
    if (database.size === 0) {
        let index = 0;
        let finished = false;

        let results = [];
        while (!finished) {
            await fetchFromLTA(`https://datamall2.mytransport.sg/ltaodataservice/BusRoutes?$skip=${index}`)
                .then(response => response.json())
                .then(json => json['value'])
                .then(records => {
                    results.push(...records);
                    index += recordsPerRequest;
                    finished = records.length <= 0;
                });
        }

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
