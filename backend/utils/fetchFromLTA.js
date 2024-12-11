const fetchFromLTA = (url, options = {}) => {
    const headers = {
        'AccountKey': `${process.env.ACCOUNT_KEY}`,
        ...options.headers,
    };
    return fetch(url, { ...options, headers });
};

module.exports = {
    fetchFromLTA
};
