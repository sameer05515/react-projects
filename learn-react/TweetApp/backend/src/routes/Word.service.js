// Word.service.js

const Word = require('./Word.model');

// Function to fetch paginated words
async function getPaginatedWords(page = 1, pageSize = 10) {
    try {
        const words = await Word.find()
            .skip((page - 1) * pageSize)
            .limit(pageSize);
        return words;
    } catch (error) {
        throw new Error('Error fetching paginated words');
    }
}

module.exports = {
    getPaginatedWords
};
