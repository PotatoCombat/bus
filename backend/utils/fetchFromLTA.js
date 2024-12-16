const fetchFromLTA = function (url, params = {}, options = {}) {
    const headers = {
        'AccountKey': `${process.env.ACCOUNT_KEY}`,
        ...options.headers,
    };
    let first = true;
    let result = [];
    for (let [key, value] of Object.entries(params)) {
        result.push(`${first ? '?' : '&'}${key}=${params[key]}`);
        first = false;
    }
    return fetch(`${url}${result.join('')}`, { ...options, headers });
};

module.exports = fetchFromLTA;
