const fetchFromLTA = require('./fetchFromLTA');

let database = new Map();

const recordsPerRequest = 500;

const fetchBusRoutes = async function () {
    if (database.size === 0) {
        let index = 0;
        let finished = false;
        while (!finished) {
            await fetchFromLTA(`https://datamall2.mytransport.sg/ltaodataservice/BusRoutes?$skip=${index}`)
                .then(response => response.json())
                .then(json => json['value'])
                .then(busStops => {
                    for (let busStop of busStops) {
                        let busNumber = busStop['ServiceNo'];
                        let busDirection = busStop['Direction'];

                        let busRoutes = database.get(busNumber) || [[], []];
                        let busRoute = busRoutes[busDirection - 1]; // Direction can only be 1 or 2

                        try {
                            busRoute.push(busStop);
                            database.set(busNumber, busRoutes);
                        } catch {
                            console.log(busRoute, busDirection - 1);
                            console.log(busNumber, busDirection);
                        }
                    }
                    for (const busNumber of database.keys()) {
                        database.set(busNumber, database.get(busNumber).filter(busRoute => busRoute.length > 0));
                    }
                    index += recordsPerRequest;
                    finished = busStops.length <= 0;
                });
        }
    }
    return database;
}

module.exports = fetchBusRoutes;
