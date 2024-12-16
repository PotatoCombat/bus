const fetchFromLTA = function (url, params = {}, options = {}) {
    const headers = {
        'AccountKey': `${process.env.ACCOUNT_KEY}`,
        ...options.headers,
    };
    let paramsString = '?';
    for (let key in params) {
        paramsString += `${key}=${params[key]}`;
    }
    return fetch(`${url}${paramsString.length <= 1 ? '' : paramsString}`, { ...options, headers });
};

module.exports = fetchFromLTA;
