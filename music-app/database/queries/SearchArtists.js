const Artist = require('../models/artist');

/**
 * Searches through the Artist collection
 * @param {object} criteria An object with a name, age, and yearsActive
 * @param {string} sortProperty The property to sort the results by
 * @param {integer} offset How many records to skip in the result set
 * @param {integer} limit How many records to return in the result set
 * @return {promise} A promise that resolves with the artists, count, offset, and limit
 */

const buildQuery = (criteria) => {
    const searchQuery = {};
    for (const key in criteria) {
        if (criteria.hasOwnProperty(key)) {
            if (key === 'yearsActive' || key === 'age') {
                searchQuery[key] = {
                    $lte: criteria[key].max,
                    $gte: criteria[key].min,
                };
            } else if (key === 'name' && criteria[key].length > 0) {
                searchQuery.$text = {
                    $search: criteria[key],
                };
            }
        }
    }

    console.log(searchQuery);
    return searchQuery;
};

module.exports = (criteria, sortProperty, offset = 0, limit = 20) => {
    const artistQuery = Artist.find(buildQuery(criteria))
        .sort({ [sortProperty]: 1 })
        .skip(offset)
        .limit(limit);

    return Promise.all([artistQuery, Artist.count()])
        .then((results) => ({
            all: results[0],
            count: results[1],
            limit,
            offset,
        }));
};
