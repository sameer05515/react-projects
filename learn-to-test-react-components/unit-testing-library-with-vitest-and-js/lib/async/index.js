import axios from 'axios';

export const fetchData = async (id) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const results = await response.json(); // Correctly await the JSON parsing
        console.log('results', results);
        return results;
    } catch (error) {
        console.error('Fetch failed:', error);
        throw error; // Rethrow the error for proper test handling
    }
};

export const fetchDataWithAxios = async (id) => {
    const results = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
    // console.log(results.data);
    return results;
};