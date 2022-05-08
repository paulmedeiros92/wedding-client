import axios from 'axios';

const baseURL = 'https://us-central1-wedding-63917.cloudfunctions.net/app/api';
// const baseURL = 'http://localhost:5001/wedding-63917/us-central1/app/api';
const api = axios.create({baseURL})

export function getSearchHousehold(queryData) {
  return api.get('/search', { params: queryData})
}