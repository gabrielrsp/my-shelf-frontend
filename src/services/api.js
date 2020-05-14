import axios from 'axios';

const api = axios.create({
  baseURL: 'https://myshelfapi.com'

});

export default api;