import axios from 'axios';

/**
 * Public placeholder API (no auth). Used instead of the deprecated local REST service.
 * @see https://jsonplaceholder.typicode.com/
 */
const placeholderApi = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export default placeholderApi;
