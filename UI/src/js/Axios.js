import axios from 'axios';


var api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    xsrfHeaderName: "X-CSRFToken",
    xsrfCookieName: "csrftoken",
    withCredentials: true
});

api.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');

export default api;