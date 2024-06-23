import { fetchData } from "./fetchData";

// Updated fetchAllTasks function
export const fetchAllTasks = () => {
    return fetchData('http://localhost:3003/tasks')
        .then(dataArray => {
            console.log('Fetched data:', dataArray);
            return { status: 'success', data: dataArray };
        })
        .catch(error => {
            console.error('Failed to fetch data:', error);
            return { status: 'error', data: [], error };
        });
};
