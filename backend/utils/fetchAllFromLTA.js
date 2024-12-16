const fetchFromLTA = require('./fetchFromLTA');

const recordsPerRequest = 500;

const fetchAllFromLTA = async function (url, options = {}) {
    let skip = 0;
    let finished = false;

    let results = [];
    while (!finished) {
        await fetchFromLTA(url, { $skip: skip }, options)
            .then(response => response.json())
            .then(json => json['value'])
            .then(records => {
                results.push(...records);
                skip += recordsPerRequest;
                finished = records.length <= 0;
            });
    }

    return results;
};

module.exports = fetchAllFromLTA;
