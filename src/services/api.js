import axios from 'axios';

const api = axios.create({
  baseURL: 'https://translate.yandex.net/api/v1.5/tr.json',
})

export default api;