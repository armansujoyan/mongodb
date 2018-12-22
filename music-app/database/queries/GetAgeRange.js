const Artist = require('../models/artist');

/**
 * Finds the lowest and highest age of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max ages, like { min: 16, max: 45 }.
 */
module.exports = () => {
    return new Promise((resolve, reject) => {
        let result = { min: -Infinity, max: Infinity };

        const minQuery = Artist.find({})
            .sort('age')
            .limit(1);

        const maxQuery = Artist.find({})
            .sort({ age: -1 })
            .limit(1);

        Promise.all([minQuery, maxQuery])
            .then((queries) => {
                result.min = queries[0][0].age;
                result.max = queries[1][0].age;
            resolve(result);
            });
    });
};
